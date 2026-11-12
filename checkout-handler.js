/**
 * Checkout Page - Order Data Handler
 * Integrate this into checkout.html to display pending order from payment handler
 * 
 * Usage: Add this script before the closing body tag in checkout.html
 */

(function() {
  'use strict';

  const CheckoutHandler = {
    config: {
      storageKey: 'brainboxX-pending-order',
      storagePrefix: 'brainboxX'
    },

    /**
     * Load pending order on page load
     */
    init: function() {
      const order = this.getPendingOrder();
      
      if (order) {
        console.log('📦 Pending order loaded:', order);
        
        // Display order summary
        this.displayOrderSummary(order);
        
        // Pre-fill form if direct checkout
        if (order.directCheckout) {
          this.markAsDirectCheckout();
        }
      } else {
        console.log('ℹ️ No pending order found - showing empty/default state');
        this.showDefaultState();
      }
    },

    /**
     * Retrieve pending order from localStorage
     */
    getPendingOrder: function() {
      const orderJson = localStorage.getItem(this.config.storageKey);
      return orderJson ? JSON.parse(orderJson) : null;
    },

    /**
     * Display order summary on checkout page
     */
    displayOrderSummary: function(order) {
      // This is a template - customize based on your checkout.html structure
      const summaryElement = document.getElementById('orderSummary') || 
                            document.querySelector('[data-order-summary]');
      
      if (summaryElement) {
        if (order.directCheckout) {
          // Single item checkout
          summaryElement.innerHTML = `
            <div class="order-item">
              <span class="item-name">${this.escapeHtml(order.productName)}</span>
              <span class="item-price">₦${order.productPrice.toLocaleString()}</span>
            </div>
            <div class="order-subtotal">
              <span>Subtotal:</span>
              <span>₦${order.subtotal.toLocaleString()}</span>
            </div>
            ${order.fee > 0 ? `
              <div class="order-fee">
                <span>Service Fee:</span>
                <span>₦${order.fee.toLocaleString()}</span>
              </div>
            ` : ''}
            <div class="order-total">
              <span><strong>Total:</strong></span>
              <span><strong>₦${order.total.toLocaleString()}</strong></span>
            </div>
          `;
        } else {
          // Cart-based checkout
          if (order.items && order.items.length > 0) {
            const itemsHtml = order.items.map(item => `
              <div class="order-item">
                <span class="item-name">${this.escapeHtml(item.name)} (x${item.qty})</span>
                <span class="item-price">₦${(item.price * item.qty).toLocaleString()}</span>
              </div>
            `).join('');

            summaryElement.innerHTML = `
              ${itemsHtml}
              <div class="order-divider"></div>
              <div class="order-subtotal">
                <span>Subtotal:</span>
                <span>₦${order.subtotal.toLocaleString()}</span>
              </div>
              ${order.fee > 0 ? `
                <div class="order-fee">
                  <span>Service Fee:</span>
                  <span>₦${order.fee.toLocaleString()}</span>
                </div>
              ` : ''}
              <div class="order-total">
                <span><strong>Total:</strong></span>
                <span><strong>₦${order.total.toLocaleString()}</strong></span>
              </div>
            `;
          }
        }
      }

      // Store order in window scope for form submission
      window.pendingOrder = order;
    },

    /**
     * Mark checkout as direct (single item)
     */
    markAsDirectCheckout: function() {
      // Add a hidden input or data attribute to mark direct checkout
      const form = document.querySelector('form[data-checkout-form]') || 
                  document.querySelector('form');
      
      if (form) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'directCheckout';
        input.value = 'true';
        form.appendChild(input);
        
        // Store reference for later use
        window.isDirectCheckout = true;
      }
    },

    /**
     * Show default state when no pending order
     */
    showDefaultState: function() {
      const emptyState = document.querySelector('[data-empty-cart]');
      if (emptyState) {
        emptyState.style.display = 'block';
      }
    },

    /**
     * Safe HTML escaping
     */
    escapeHtml: function(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    /**
     * Prepare order for final submission
     * Call this before form submission to payment page
     */
    prepareForPayment: function(customerInfo) {
      const order = this.getPendingOrder();
      
      if (!order) {
        console.error('❌ No pending order found');
        return null;
      }

      // Merge customer info with order
      const finalOrder = {
        ...order,
        customer: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        timestamp: Date.now(),
        reference: 'BRAINBOXX-' + Date.now().toString().slice(-6)
      };

      // Save for payment page
      localStorage.setItem(this.config.storagePrefix + '-final-order', JSON.stringify(finalOrder));
      
      return finalOrder;
    },

    /**
     * Clear checkout data after successful payment
     */
    clearCheckoutData: function() {
      localStorage.removeItem(this.config.storageKey);
      localStorage.removeItem(this.config.storagePrefix + '-final-order');
    }
  };

  // Auto-initialize on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CheckoutHandler.init());
  } else {
    CheckoutHandler.init();
  }

  // Expose for external use
  window.CheckoutHandler = CheckoutHandler;
})();
