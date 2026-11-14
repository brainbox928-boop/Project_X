function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

function failure(status, message) {
  return json(status, { status: 'error', verified: false, message });
}

export default async function verifyPayment(request) {
  if (request.method !== 'POST') return failure(405, 'Method not allowed.');

  let data;
  try {
    const body = await request.text();
    if (body.length > 4096) return failure(413, 'Request is too large.');
    data = JSON.parse(body);
  } catch (error) {
    console.error('Invalid verification request:', error.message);
    return failure(400, 'Invalid verification request.');
  }

  if (!data || typeof data.reference !== 'string' ||
      !/^[A-Za-z0-9._=-]{1,100}$/.test(data.reference) ||
      typeof data.email !== 'string' || data.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      !Number.isSafeInteger(data.amount) || data.amount <= 0) {
    return failure(400, 'A valid reference, email and amount in kobo are required.');
  }

  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !/^sk_test_[A-Za-z0-9]+$/.test(secret)) {
    console.error('Test-mode Paystack verification is not configured.');
    return failure(503, 'Test payment verification is unavailable. Contact support with your reference.');
  }

  let result;
  try {
    const response = await fetch(
      'https://api.paystack.co/transaction/verify/' + encodeURIComponent(data.reference),
      {
        headers: { Authorization: 'Bearer ' + secret, Accept: 'application/json' },
        signal: AbortSignal.timeout(20000)
      }
    );
    if (!response.ok) {
      console.error('Paystack verification returned HTTP ' + response.status);
      return failure(502, 'Paystack could not verify this payment. Contact support with your reference.');
    }
    result = await response.json();
  } catch (error) {
    console.error('Paystack verification request failed:', error.message);
    return failure(502, 'Could not reach Paystack. Please retry verification.');
  }

  const transaction = result?.data;
  if (result?.status !== true || !transaction ||
      transaction.reference !== data.reference || transaction.status !== 'success' ||
      !Number.isSafeInteger(transaction.amount) || transaction.amount !== data.amount ||
      transaction.currency !== 'NGN' || typeof transaction.customer?.email !== 'string' ||
      transaction.customer.email.toLowerCase() !== data.email.toLowerCase()) {
    return failure(422, 'The transaction does not match the supplied details. Contact support with your reference.');
  }

  return json(200, {
    status: 'success',
    verified: true,
    message: 'Test transaction verified with Paystack; order pricing is not independently verified.',
    reference: transaction.reference,
    amount: transaction.amount,
    currency: transaction.currency
  });
}
