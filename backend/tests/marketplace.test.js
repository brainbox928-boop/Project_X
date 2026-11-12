const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', '..');

test('marketplace stylesheet is contained in the document head', () => {
  const html = fs.readFileSync(path.join(root, 'marketplace.html'), 'utf8');
  const head = html.split('</head>')[0];
  assert.match(head, /<style>[\s\S]*\.wishlist-btn[\s\S]*<\/style>/);
  assert.doesNotMatch(head, /<\/style>[\s\S]*<style>/);
});

test('marketplace and payment inline scripts parse', () => {
  for (const file of ['marketplace.html', 'payment.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    assert.ok(scripts.length, `${file} should have an inline script`);
    for (const [, script] of scripts) {
      assert.doesNotThrow(() => new Function(script), `${file} has invalid JavaScript`);
    }
  }
});

test('unconnected checkout cannot create an order or display placeholder bank details', () => {
  const html = fs.readFileSync(path.join(root, 'payment.html'), 'utf8');
  assert.match(html, /<button[^>]*type="submit"[^>]*disabled/);
  assert.doesNotMatch(html, /cartManager\.createOrder\s*\(/);
  assert.doesNotMatch(html, /0123456789/);
});
