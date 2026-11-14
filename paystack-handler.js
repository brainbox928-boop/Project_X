/**
 * Paystack Payment Handler for brainboxX
 * Handles payment initialization, processing, and verification
 * 
 * Usage: Include this after paystack-config.js and the Paystack SDK
 */

const PaystackHandler = {
  /**
   * Initialize and launch Paystack payment popup
   * @param {object} orderData - Order details {email, amount, reference, etc.}
   * @param {function} onSuccess - Callback after successful payment
   * @param {function} onFailure - Callback on payment failure
   */
  initiatePayment: function(orderData, onSuccess, onFailure) {
    // Validate configuration
    if (!PaystackConfig.isConfigured()) {
      console.error('❌ Paystack not configured. Set your public key in paystack-config.js');
      if (onFailure) {
        onFailure({ message: 'Payment gateway not configured' });
      }
      return;
    }

    // Validate order data
    if (!this.validateOrderData(orderData)) {
      console.error('❌ Invalid order data');
      if (onFailure) {
        onFailure({ message: 'Invalid order data' });
      }
      return;
    }

    // Prepare payment data
    const paymentData = {
      key: PaystackConfig.credentials.publicKey,
      email: orderData.email,
      amount: PaystackConfig.formatAmountForPaystack(orderData.total),
      reference: orderData.reference || PaystackConfig.generateReference(),
      
      // Optional: Customer information
      metadata: {
        name: orderData.customerName || '',
        phone: orderData.phone || '',
        address: orderData.address || '',
        custom_fields: [
          {
            display_name: 'Order ID',
            variable_name: 'order_id',
            value: orderData.orderId || 'N/A'
          },
          {
            display_name: 'Order Items',
            variable_name: 'items',
            value: orderData.itemCount || '1'
          }
        ]
      },

      onClose: () => {
        console.warn('⚠️ User closed payment popup');
        this.handlePaymentClosed(orderData);
      },

      callback: (response) => {
        console.log('✅ Payment successful:', response);
        this.verifyPaymentOnServer(response.reference, orderData, onSuccess);
      }
    };

    // Initialize Paystack
    const handler = PaystackPop.setup(paymentData);
    handler.openIframe();
  },

  /**
   * Verify payment reference on server (backend should handle this)
   * This is a client-side verification - production should verify on backend
   * @param {string} reference - Payment reference from Paystack
   * @param {object} orderData - Order details
   * @param {function} onSuccess - Success callback
   */
  verifyPaymentOnServer: function(reference, orderData, onSuccess) {
    console.log('🔍 Verifying payment reference:', reference);

    // Build verification request
    const verificationData = {
      reference: reference,
      email: orderData.email,
      orderId: orderData.orderId,
      amount: orderData.total
    };

    // Option 1: Verify via your backend (RECOMMENDED)
    this.verifyViaBackend(verificationData, onSuccess);

    // Option 2: Direct verification with Paystack (less secure, for testing only)
    // this.verifyViaPaystack(reference, onSuccess);
  },

  /**
   * Verify payment via your backend
   * @param {object} data - Verification data
   * @param {function} onSuccess - Success callback
   */
  verifyViaBackend: function(data, onSuccess) {
    // Send to your backend for verification
    // Your backend should then verify with Paystack using the secret key
    
    fetch('payment-verify.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference: data.reference,
        email: data.email,
        amount: PaystackConfig.formatAmountForPaystack(data.amount)
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success' && result.verified) {
        console.log('✅ Payment verified on server');
        sessionStorage.setItem('brainboxX-pending-verification', JSON.stringify({
          reference: data.reference,
          email: data.email,
          amount: PaystackConfig.formatAmountForPaystack(data.amount)
        }));
        this.handlePaymentSuccess({
          reference: data.reference,
          verified: true,
          orderData: data
        }, onSuccess);
      } else {
        console.error('❌ Payment verification failed');
        this.handlePaymentFailure({
          reference: data.reference,
          message: result.message || 'Verification failed'
        });
      }
    })
    .catch(error => {
      console.error('❌ Verification error:', error);
      this.handlePaymentFailure({
        message: 'Verification error: ' + error.message
      });
    });
  },

  /**
   * Direct verification with Paystack API (for testing only)
   * In production, this should be done on your backend with the secret key
   * @param {string} reference - Payment reference
   * @param {function} onSuccess - Success callback
   */
  verifyViaPaystack: function(reference, onSuccess) {
    console.log('⚠️ Using client-side verification (not recommended for production)');
    
    // This is a DEMO - in production use backend verification
    // You CANNOT use secretKey on frontend in production
    
    fetch(`${PaystackConfig.api.verifyTransaction}/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PaystackConfig.credentials.publicKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      if (result.status && result.data.status === 'success') {
        console.log('✅ Payment verified with Paystack');
        this.handlePaymentSuccess(result, onSuccess);
      } else {
        console.error('❌ Payment not successful');
        this.handlePaymentFailure(result);
      }
    })
    .catch(error => {
      console.error('❌ Verification error:', error);
    });
  },

  /**
   * Handle successful payment
   * @param {object} response - Response from Paystack
   * @param {function} callback - Optional callback
   */
  handlePaymentSuccess: function(response, callback) {
    console.log('✅ PAYMENT SUCCESS');
    console.log('Reference:', response.reference);
    console.log('Amount:', response.data?.amount / 100 || 'N/A');

    // Store successful payment in localStorage
    const paymentRecord = {
      status: 'success',
      reference: response.reference,
      timestamp: new Date().toISOString(),
      amount: response.data?.amount / 100,
      email: response.data?.customer?.email,
      orderId: response.data?.metadata?.custom_fields?.order_id
    };

    localStorage.setItem('brainboxX-last-payment', JSON.stringify(paymentRecord));

    // Show success message
    this.showNotification('✅ Payment successful!', 'success');

    // Redirect to success page
    setTimeout(() => {
      window.location.href = PaystackConfig.redirectUrls.successPage + 
                            '?reference=' + response.reference;
    }, 2000);

    // Call callback if provided
    if (callback && typeof callback === 'function') {
      callback(paymentRecord);
    }
  },

  /**
   * Handle failed payment
   * @param {object} response - Error response
   */
  handlePaymentFailure: function(response) {
    console.error('❌ PAYMENT FAILED');
    
    this.showNotification(
      '❌ Payment failed: ' + (response.message || 'Unknown error'),
      'error'
    );

    // Redirect to failure page
    setTimeout(() => {
      window.location.href = PaystackConfig.redirectUrls.failurePage + 
                            '?error=' + encodeURIComponent(response.message || 'Payment failed');
    }, 3000);
  },

  /**
   * Handle when user closes payment popup
   * @param {object} orderData - Order data
   */
  handlePaymentClosed: function(orderData) {
    this.showNotification(
      '⚠️ Payment cancelled. You can retry anytime.',
      'warning'
    );
  },

  /**
   * Validate order data
   * @param {object} orderData - Order to validate
   * @returns {boolean}
   */
  validateOrderData: function(orderData) {
    if (!orderData.email) {
      console.error('❌ Email is required');
      return false;
    }

    if (!orderData.total || orderData.total <= 0) {
      console.error('❌ Valid amount is required');
      return false;
    }

    if (orderData.total < PaystackConfig.currency.minAmount) {
      console.error(`❌ Amount must be at least ₦${PaystackConfig.currency.minAmount}`);
      return false;
    }

    if (orderData.total > PaystackConfig.currency.maxAmount) {
      console.error(`❌ Amount cannot exceed ₦${PaystackConfig.currency.maxAmount}`);
      return false;
    }

    return true;
  },

  /**
   * Show notification to user
   * @param {string} message - Message to display
   * @param {string} type - 'success', 'error', 'warning', 'info'
   */
  showNotification: function(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `paystack-notification notification-${type}`;
    notification.textContent = message;
    
    // Style it
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: '10000',
      animation: 'slideIn 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });

    // Set colors based on type
    const colors = {
      success: { bg: '#10b981', color: 'white' },
      error: { bg: '#ef4444', color: 'white' },
      warning: { bg: '#f59e0b', color: 'white' },
      info: { bg: '#3b82f6', color: 'white' }
    };

    const colors_set = colors[type] || colors.info;
    notification.style.backgroundColor = colors_set.bg;
    notification.style.color = colors_set.color;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  },

  /**
   * Get last successful payment
   * @returns {object|null}
   */
  getLastPayment: function() {
    const payment = localStorage.getItem('brainboxX-last-payment');
    return payment ? JSON.parse(payment) : null;
  },

  /**
   * Clear payment history
   */
  clearPaymentHistory: function() {
    localStorage.removeItem('brainboxX-last-payment');
  },

  /**
   * Log handler status
   */
  logStatus: function() {
    console.group('🔄 Paystack Handler Status');
    console.log('Configured:', PaystackConfig.isConfigured() ? '✅ Yes' : '❌ No');
    console.log('Last Payment:', this.getLastPayment() || 'None');
    console.log('Payment Methods:', PaystackConfig.paymentMethods);
    console.groupEnd();
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaystackHandler;
}
