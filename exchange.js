(function () {
  'use strict';

  const form = document.getElementById('exchange-form');
  const action = document.getElementById('trade-action');
  const type = document.getElementById('asset-type');
  const asset = document.getElementById('asset-name');
  const payout = document.getElementById('payout');
  const usd = document.getElementById('usd-estimate');
  const region = document.getElementById('region');
  const network = document.getElementById('network');
  const suggestions = document.getElementById('asset-suggestions');
  const result = document.getElementById('request-result');
  const message = document.getElementById('request-message');
  const error = document.getElementById('form-error');
  const status = document.getElementById('copy-status');
  const categories = { crypto: 'Digital currency', physical: 'Physical gift card', digital: 'E-gift code' };
  const assets = {
    crypto: ['Bitcoin (BTC)', 'USDT', 'Ethereum (ETH)', 'USDC'],
    physical: ['Amazon', 'Apple', 'Google Play', 'Steam', 'Razer Gold', 'Xbox'],
    digital: ['Amazon', 'Apple', 'Google Play', 'Steam', 'Razer Gold', 'Xbox']
  };

  function updateFields() {
    const selling = action.value === 'Sell';
    const crypto = type.value === 'crypto';
    const card = type.value === 'physical' || type.value === 'digital';
    const cryptoPayout = selling && payout.value === 'Crypto payout';
    document.getElementById('payout-label').hidden = !selling;
    document.getElementById('usd-label').hidden = !cryptoPayout;
    document.getElementById('region-label').hidden = !card;
    document.getElementById('network-label').hidden = !crypto;
    usd.required = cryptoPayout;
    region.required = card;
    network.required = crypto;
    suggestions.replaceChildren();
    (assets[type.value] || []).forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      suggestions.appendChild(option);
    });
    result.hidden = true;
    error.hidden = true;
  }

  [action, type, payout].forEach(field => field.addEventListener('change', updateFields));
  form.addEventListener('input', () => { result.hidden = true; });
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', () => {
      type.value = link.dataset.category;
      asset.value = '';
      updateFields();
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    error.hidden = true;
    const name = asset.value.trim();
    const unit = document.getElementById('amount-unit').value.trim();
    const location = region.value.trim();
    const chain = network.value.trim();
    const amount = Number(document.getElementById('trade-amount').value);
    const isSelling = action.value === 'Sell';
    const cryptoPayout = isSelling && payout.value === 'Crypto payout';
    if (!name || !unit || !Number.isFinite(amount) || amount <= 0 ||
        (type.value === 'crypto' && !chain) || (type.value !== 'crypto' && !location)) {
      error.textContent = 'Please provide a valid asset, amount, unit and region or network.';
      error.hidden = false;
      return;
    }
    if (cryptoPayout && (!Number.isFinite(Number(usd.value)) || Number(usd.value) <= 500)) {
      error.textContent = 'Crypto cash-out requests are available only for trades estimated above $500.';
      error.hidden = false;
      return;
    }
    const lines = [
      'Hello brainboxX, I would like to request a trade quote.',
      'Action: ' + action.value,
      'Asset type: ' + categories[type.value],
      'Asset: ' + name,
      'Amount: ' + document.getElementById('trade-amount').value + ' ' + unit,
      type.value === 'crypto' ? 'Network: ' + chain : 'Card region: ' + location
    ];
    if (isSelling) lines.push('Preferred cash-out: ' + payout.value);
    if (cryptoPayout) lines.push('Estimated trade value: USD ' + usd.value);
    const notes = document.getElementById('trade-notes').value.trim();
    if (notes) lines.push('Additional details: ' + notes);
    lines.push('Please confirm the current rate, fees and availability.');
    message.value = lines.join('\n');
    status.textContent = '';
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('copy-request').addEventListener('click', async () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      message.focus();
      message.select();
      status.textContent = 'Copy is unavailable here. The message is selected; copy it manually.';
      return;
    }
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Copied. Open WhatsApp, paste the message and send it.';
    } catch (copyError) {
      console.error('Unable to copy the trade request:', copyError);
      message.focus();
      message.select();
      status.textContent = 'Could not copy automatically. The message is selected; copy it manually.';
    }
  });
  updateFields();
}());
