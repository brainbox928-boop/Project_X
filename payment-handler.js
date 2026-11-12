/**
 * Payment Handler - Unified checkout system for brainboxX
 * Handles "Buy Now" and cart-based checkouts across all pages
 * Version: 1.0
 */

const PaymentHandler = {
  // Configuration
  config: {
    storagePrefix: 'brainboxX',
    checkoutPage: 'checkout.html',
    paymentPage: 'payment.html',
    currency: '₦',
    serviceFee: 2500,
    serviceFeeThreshold: 0
  },

  /**
   * Direct "Buy Now" checkout - single item
   * @param {string} productId - Product identifier
   * @param {string} productName - Product name
   * @param {number} productPrice - Product price
   * @param {string} category - Product category (optional)
   */
  buyNow: function(productId, productName, productPrice, category = '') {
    // Clear existing cart
    if (typeof cartManager !== 'undefined' && cartManager.clearCart) {
      cartManager.clearCart();
    }

    // Store order metadata
    const orderData = {
      productId: productId,
      productName: productName,
      productPrice: productPrice,
      quantity: 1,
      category: category,
      subtotal: productPrice,
      fee: productPrice > this.config.serviceFeeThreshold ? this.config.serviceFee : 0,
      total: productPrice + (productPrice > this.config.serviceFeeThreshold ? this.config.serviceFee : 0),
      directCheckout: true,
      timestamp: Date.now(),
      source: 'direct-buy-now'
    };

    // Save to localStorage
    localStorage.setItem(this.config.storagePrefix + '-pending-order', JSON.stringify(orderData));
    
    // Redirect to checkout
    window.location.href = this.config.checkoutPage + '?direct=true&product=' + encodeURIComponent(productId);
  },

  /**
   * Cart-based checkout - multiple items
   */
  proceedToCheckout: function() {
    if (typeof cartManager !== 'undefined' && cartManager.cart) {
      if (cartManager.cart.length === 0) {
        alert('Your cart is empty! Add items before checking out.');
        return;
      }

      // Store cart data
      const orderData = {
        items: cartManager.cart,
        subtotal: cartManager.getTotal(),
        fee: cartManager.getTotal() > this.config.serviceFeeThreshold ? this.config.serviceFee : 0,
        total: cartManager.getTotal() + (cartManager.getTotal() > this.config.serviceFeeThreshold ? this.config.serviceFee : 0),
        itemCount: cartManager.getItemCount(),
        directCheckout: false,
        timestamp: Date.now(),
        source: 'cart-checkout'
      };

      localStorage.setItem(this.config.storagePrefix + '-pending-order', JSON.stringify(orderData));
    }

    // Redirect to checkout
    window.location.href = this.config.checkoutPage;
  },

  /**
   * Retrieve pending order from localStorage
   */
  getPendingOrder: function() {
    const orderJson = localStorage.getItem(this.config.storagePrefix + '-pending-order');
    return orderJson ? JSON.parse(orderJson) : null;
  },

  /**
   * Clear pending order
   */
  clearPendingOrder: function() {
    localStorage.removeItem(this.config.storagePrefix + '-pending-order');
  },

  /**
   * Format currency
   */
  formatMoney: function(amount) {
    return this.config.currency + amount.toLocaleString();
  },

  /**
   * Initialize payment buttons on page
   * Converts data-buy-now attributes into clickable buttons
   */
  initializeButtons: function() {
    const self = this;
    
    // Find all buy-now buttons
    document.querySelectorAll('[data-buy-now]').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = parseFloat(this.getAttribute('data-product-price'));
        const category = this.getAttribute('data-category') || '';
        
        if (productId && productName && productPrice) {
          self.buyNow(productId, productName, productPrice, category);
        }
      });
    });

    // Checkout buttons
    document.querySelectorAll('[data-checkout]').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        self.proceedToCheckout();
      });
    });
  }
};

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PaymentHandler.initializeButtons());
} else {
  PaymentHandler.initializeButtons();
}
