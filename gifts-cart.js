(function () {
  'use strict';

  const cartKey = 'brainboxX-gift-cart';
  const pendingKey = 'brainboxX-pending-order';
  const dialog = document.getElementById('gift-cart');
  const toggle = document.querySelector('.gift-cart-toggle');
  const itemsContainer = document.getElementById('gift-cart-items');
  const checkoutButton = document.querySelector('.gift-cart-checkout');
  let cart;

  function isValidCart(items) {
    return Array.isArray(items) && items.every(item =>
      item && typeof item.id === 'string' && typeof item.name === 'string' &&
      typeof item.description === 'string' && typeof item.icon === 'string' &&
      Number.isSafeInteger(item.price) && item.price > 0 &&
      Number.isSafeInteger(item.quantity) && item.quantity > 0
    );
  }

  try {
    const stored = localStorage.getItem(cartKey);
    cart = stored ? JSON.parse(stored) : [];
    if (!isValidCart(cart)) throw new Error('Cart data is invalid');
  } catch (error) {
    console.error('Unable to load gift cart:', error);
    alert('Your gift cart could not be loaded. Please contact support before continuing.');
    return;
  }

  function save() {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart));
      render();
      return true;
    } catch (error) {
      console.error('Unable to save gift cart:', error);
      alert('Your cart could not be saved. Please check browser storage and try again.');
      return false;
    }
  }

  function render() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('gift-cart-count').textContent = count;
    document.getElementById('gift-cart-subtotal').textContent = '₦' + subtotal.toLocaleString();
    itemsContainer.replaceChildren();
    checkoutButton.disabled = cart.length === 0;
    if (!cart.length) {
      const empty = document.createElement('p');
      empty.textContent = 'Your cart is empty.';
      itemsContainer.appendChild(empty);
      return;
    }
    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'gift-cart-item';
      const details = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = item.name;
      const price = document.createElement('p');
      price.textContent = '₦' + item.price.toLocaleString() + ' × ' + item.quantity;
      details.append(name, price);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'gift-cart-remove';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', 'Remove ' + item.name);
      remove.addEventListener('click', () => {
        const previous = cart;
        cart = cart.filter((_, position) => position !== index);
        if (!save()) cart = previous;
      });
      row.append(details, remove);
      itemsContainer.appendChild(row);
    });
  }

  function productFromPage() {
    const name = document.querySelector('.product-title, .product-info h1')?.textContent.trim();
    const priceText = document.querySelector('.price')?.textContent.trim();
    const quantity = document.getElementById('quantity');
    const color = document.getElementById('color-variant');
    if (!name || !priceText || !/^[N₦][\d,]+$/.test(priceText)) {
      throw new Error('Product information is incomplete');
    }
    const price = Number(priceText.slice(1).replace(/,/g, ''));
    if (!Number.isSafeInteger(price) || price <= 0) throw new Error('Invalid product price');
    const count = quantity ? Number(quantity.value) : 1;
    if (!Number.isSafeInteger(count) || count < 1) throw new Error('Invalid quantity');
    const colorName = color ? color.options[color.selectedIndex].text : '';
    const description = document.querySelector('.product-summary, .product-description')?.textContent.trim() || name;
    const link = decodeURIComponent(location.pathname.split('/').pop());
    return {
      id: link + '|' + name + '|' + price + '|' + colorName,
      name, description: colorName ? description + ' | Color: ' + colorName : description,
      price, quantity: count, icon: '🎁'
    };
  }

  function openCart() {
    render();
    dialog.showModal();
    toggle.setAttribute('aria-expanded', 'true');
  }

  function proceed(items) {
    try {
      if (localStorage.getItem(pendingKey) && !confirm('This will replace your current pending checkout. Continue?')) return;
      localStorage.setItem(pendingKey, JSON.stringify(items));
      window.location.href = 'checkout.html';
    } catch (error) {
      console.error('Unable to start checkout:', error);
      alert('Checkout could not be started. Please check browser storage and try again.');
    }
  }

  document.querySelectorAll('.product-card').forEach(card => {
    const detail = card.querySelector('.view-details-link');
    const name = card.querySelector('h3')?.textContent.trim();
    if (detail) {
      detail.textContent = 'View details';
      if (name) detail.setAttribute('aria-label', 'View details for ' + name);
    }
  });

  document.querySelectorAll('button[onclick="addToCart()"]').forEach(add => {
    add.removeAttribute('onclick');
    add.addEventListener('click', event => {
      event.preventDefault();
      try {
        const product = productFromPage();
        const previous = cart.map(item => ({ ...item }));
        const existing = cart.find(item => item.id === product.id);
        if (existing) existing.quantity += product.quantity;
        else cart.push(product);
        if (save()) openCart();
        else cart = previous;
      } catch (error) {
        console.error('Unable to add product:', error);
        alert('This product could not be added. Please open its details or contact support.');
      }
    });
  });
  document.querySelectorAll('button[onclick="buyNow()"]').forEach(buy => {
    buy.removeAttribute('onclick');
    buy.addEventListener('click', () => {
      try {
        proceed([productFromPage()]);
      } catch (error) {
        console.error('Unable to purchase product:', error);
        alert('This product could not be sent to checkout. Please open its details or contact support.');
      }
    });
  });

  toggle.addEventListener('click', openCart);
  document.querySelector('.gift-cart-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
  });
  checkoutButton.addEventListener('click', () => {
    if (cart.length) proceed(cart);
  });
  window.addEventListener('storage', event => {
    if (event.key === cartKey) {
      try {
        const updated = event.newValue ? JSON.parse(event.newValue) : [];
        if (!isValidCart(updated)) throw new Error('Cart data is invalid');
        cart = updated;
        render();
      } catch (error) {
        console.error('Unable to sync gift cart:', error);
        alert('Your cart could not be synchronized. Refresh the page before checking out.');
      }
    }
  });
  render();
}());
