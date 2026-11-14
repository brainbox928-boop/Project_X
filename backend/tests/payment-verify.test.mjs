import test from 'node:test';
import assert from 'node:assert/strict';
import verifyPayment from '../../netlify/functions/payment-verify.mjs';

const payment = { reference: 'test-reference', email: 'customer@example.com', amount: 268800 };
const transaction = {
  reference: payment.reference, status: 'success', amount: payment.amount,
  currency: 'NGN', customer: { email: payment.email }
};

function request(body = payment, method = 'POST') {
  return new Request('https://example.test/.netlify/functions/payment-verify', {
    method,
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {})
  });
}

test('Netlify payment verification fails closed', async t => {
  const originalFetch = globalThis.fetch;
  const originalSecret = process.env.PAYSTACK_SECRET_KEY;
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalSecret === undefined) delete process.env.PAYSTACK_SECRET_KEY;
    else process.env.PAYSTACK_SECRET_KEY = originalSecret;
  });
  process.env.PAYSTACK_SECRET_KEY = 'sk_test_example';
  const reply = async data => new Response(JSON.stringify(data), { status: 200 });

  await t.test('verifies a matching successful test transaction', async () => {
    globalThis.fetch = async () => reply({ status: true, data: transaction });
    const response = await verifyPayment(request());
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.equal(result.verified, true);
    assert.equal(result.amount, payment.amount);
  });

  for (const [label, change] of [
    ['failed payment', { status: 'failed' }],
    ['pending payment', { status: 'pending' }],
    ['incorrect reference', { reference: 'other' }],
    ['incorrect amount', { amount: 1 }],
    ['incorrect currency', { currency: 'USD' }],
    ['incorrect email', { customer: { email: 'other@example.com' } }]
  ]) {
    await t.test('rejects ' + label, async () => {
      globalThis.fetch = async () => reply({ status: true, data: { ...transaction, ...change } });
      const response = await verifyPayment(request());
      assert.equal(response.status, 422);
      assert.equal((await response.json()).verified, false);
    });
  }

  await t.test('rejects invalid input and unsupported methods', async () => {
    assert.equal((await verifyPayment(request({ ...payment, amount: -1 }))).status, 400);
    assert.equal((await verifyPayment(request(payment, 'GET'))).status, 405);
  });
  await t.test('reports interrupted upstream requests without confirming payment', async () => {
    globalThis.fetch = async () => { throw new Error('connection interrupted'); };
    const response = await verifyPayment(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).verified, false);
  });
  await t.test('refuses missing and live secrets', async () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    assert.equal((await verifyPayment(request())).status, 503);
    process.env.PAYSTACK_SECRET_KEY = 'sk_live_example';
    assert.equal((await verifyPayment(request())).status, 503);
  });
});
