/**
 * Paystack Configuration Module for brainboxX
 * Handles all Paystack API keys, endpoints, and configuration
 * 
 * IMPORTANT: Get your keys from https://dashboard.paystack.com/#/settings/developer
 */

const PaystackConfig = {
  // ========================
  // 1. PAYSTACK CREDENTIALS
  // ========================
  // Step 1: Sign up at paystack.com and get your keys
  // Replace these with your actual keys
  credentials: {
    // Public Key - Safe to expose in frontend (used for payment initialization)
    publicKey: 'pk_test_e9785f2a427b2eb9cae3bfd8d7eb7a09576fb372',
  },

  // ========================
  // 2. API ENDPOINTS
  // ========================
  api: {
    baseUrl: 'https://api.paystack.co',
    
    // Initialize transaction endpoint
    initializeTransaction: 'https://api.paystack.co/transaction/initialize',
    
    // Verify transaction endpoint
    verifyTransaction: 'https://api.paystack.co/transaction/verify',
    
    // Customer endpoints
    createCustomer: 'https://api.paystack.co/customer',
    getCustomer: 'https://api.paystack.co/customer',
    
    // Payment plans (for subscriptions)
    createPlan: 'https://api.paystack.co/plan',
  },

  // ========================
  // 3. CURRENCY & AMOUNTS
  // ========================
  currency: {
    code: 'NGN',        // Nigerian Naira
    symbol: '₦',
    decimals: 2,
    minAmount: 100,     // Minimum ₦100
    maxAmount: 50000000 // Maximum ₦50,000,000
  },

  // ========================
  // 4. FEES & CHARGES
  // ========================
  fees: {
    serviceFee: 2500,           // ₦2,500 service fee
    serviceFeeThreshold: 0,     // Apply fee to all orders
    paystackCommission: 0.015,  // 1.5% commission (Paystack charges this)
    calculateTotal: function(amount) {
      // Calculate with Paystack's commission
      const commission = amount * this.paystackCommission;
      const total = amount + this.serviceFee + commission;
      return {
        subtotal: amount,
        serviceFee: this.serviceFee,
        paystackFee: commission,
        total: Math.round(total) // Round to nearest kobo
      };
    }
  },

  // ========================
  // 5. REDIRECT URLS
  // ========================
  redirectUrls: {
    successPage: 'payment-success.html',
    failurePage: 'payment-failure.html',
    callbackUrl: window.location.origin + '/payment-callback.php' // Backend URL
  },

  // ========================
  // 6. TIMEOUT SETTINGS
  // ========================
  timeout: {
    verification: 5000,  // 5 seconds to verify payment
    checkout: 30000      // 30 seconds checkout timeout
  },

  // ========================
  // 7. PAYMENT METHODS
  // ========================
  paymentMethods: [
    'card',           // Credit/Debit cards
    'bank',           // Bank transfers
    'ussd',           // USSD codes
    'qr',             // QR codes
    'mobile_money'    // Mobile money (where available)
  ],

  // ========================
  // 8. HELPER METHODS
  // ========================

  /**
   * Format amount for Paystack (convert to kobo)
   * Paystack expects amount in kobo (₦1 = 100 kobo)
   * @param {number} amount - Amount in Naira
   * @returns {number} Amount in kobo
   */
  formatAmountForPaystack: function(amount) {
    return Math.round(amount * 100);
  },

  /**
   * Convert kobo back to Naira
   * @param {number} kobo - Amount in kobo
   * @returns {number} Amount in Naira
   */
  formatAmountFromPaystack: function(kobo) {
    return kobo / 100;
  },

  /**
   * Validate public key is set
   * @returns {boolean}
   */
  isConfigured: function() {
    return this.credentials.publicKey && 
           !this.credentials.publicKey.includes('YOUR_PUBLIC_KEY_HERE');
  },

  /**
   * Get initialization data for payment
   * @param {object} orderData - Order information
   * @returns {object} Paystack initialization object
   */
  getPaymentInitData: function(orderData) {
    if (!this.isConfigured()) {
      console.error('❌ Paystack not configured! Set your public key first.');
      return null;
    }

    return {
      key: this.credentials.publicKey,
      email: orderData.email,
      amount: this.formatAmountForPaystack(orderData.total),
      reference: this.generateReference(),
      onClose: function() {
        console.warn('⚠️ User closed payment popup');
      },
      onSuccess: function(response) {
        console.log('✅ Payment successful!', response);
        PaystackHandler.handlePaymentSuccess(response);
      }
    };
  },

  /**
   * Generate unique reference for payment
   * @returns {string} Unique reference ID
   */
  generateReference: function() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(7).toUpperCase();
    return `BRAINBOXX-${timestamp}-${random}`;
  },

  /**
   * Get all configured endpoints
   * @returns {object} All API endpoints
   */
  getApiEndpoints: function() {
    return this.api;
  },

  /**
   * Log configuration status (for debugging)
   */
  logStatus: function() {
    console.group('🔧 Paystack Configuration Status');
    console.log('Public Key:', this.credentials.publicKey.substring(0, 10) + '...');
    console.log('Configured:', this.isConfigured() ? '✅ Yes' : '❌ No');
    console.log('Currency:', this.currency.code);
    console.log('Min Amount:', this.currency.symbol + this.currency.minAmount);
    console.log('Max Amount:', this.currency.symbol + (this.currency.maxAmount).toLocaleString());
    console.groupEnd();
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaystackConfig;
}
