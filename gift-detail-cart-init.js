(function () {
  'use strict';
  const nav = document.querySelector('.site-nav');
  if (!nav) {
    console.error('Cannot initialize gift cart: navigation not found.');
    return;
  }
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'gift-cart-toggle';
  toggle.setAttribute('aria-controls', 'gift-cart');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = 'Cart <span id="gift-cart-count">0</span>';
  nav.appendChild(toggle);
  const dialog = document.createElement('dialog');
  dialog.id = 'gift-cart';
  dialog.className = 'gift-cart';
  dialog.setAttribute('aria-labelledby', 'gift-cart-title');
  dialog.innerHTML = `
    <div class="gift-cart-header">
      <h2 id="gift-cart-title">Your cart</h2>
      <button type="button" class="gift-cart-close" aria-label="Close cart">&times;</button>
    </div>
    <div id="gift-cart-items"></div>
    <p class="gift-cart-total">Subtotal: <strong id="gift-cart-subtotal">₦0</strong></p>
    <p class="gift-cart-note">Shipping and VAT are calculated at checkout.</p>
    <button type="button" class="gift-cart-checkout">Proceed to checkout</button>`;
  document.body.appendChild(dialog);
}());
