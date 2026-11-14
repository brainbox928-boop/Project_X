<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond($code, $message, $data = []) {
    http_response_code($code);
    echo json_encode(array_merge([
        'status' => $code === 200 ? 'success' : 'error',
        'verified' => $code === 200,
        'message' => $message
    ], $data));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Method not allowed.');
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)
    || !isset($data['reference'], $data['email'], $data['amount'])
    || !is_string($data['reference'])
    || !preg_match('/^[A-Za-z0-9._=-]{1,100}$/', $data['reference'])
    || !is_string($data['email'])
    || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)
    || !is_int($data['amount'])
    || $data['amount'] <= 0) {
    respond(400, 'A valid reference, email and amount in kobo are required.');
}

$secretKey = getenv('PAYSTACK_SECRET_KEY');
if (!$secretKey || !preg_match('/^sk_(test|live)_[A-Za-z0-9]+$/', $secretKey)) {
    error_log('Paystack verification is not configured.');
    respond(503, 'Payment verification is unavailable. Please contact support with your reference.');
}
if (!function_exists('curl_init')) {
    error_log('Paystack verification requires PHP cURL.');
    respond(503, 'Payment verification is unavailable. Please contact support with your reference.');
}

$curl = curl_init('https://api.paystack.co/transaction/verify/' . rawurlencode($data['reference']));
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $secretKey, 'Accept: application/json']
]);
$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($response === false) {
    error_log('Paystack verification connection error: ' . $curlError);
    respond(502, 'Could not reach Paystack. Please retry verification.');
}
$result = json_decode($response, true);
if ($httpCode !== 200 || !is_array($result) || !isset($result['status'], $result['data'])
    || $result['status'] !== true || !is_array($result['data'])) {
    error_log('Paystack verification failed with HTTP status ' . $httpCode);
    respond(502, 'Paystack could not verify this payment. Please contact support with your reference.');
}

$transaction = $result['data'];
if (!isset($transaction['reference'], $transaction['status'], $transaction['amount'],
    $transaction['currency'], $transaction['customer']['email'])
    || $transaction['reference'] !== $data['reference']
    || $transaction['status'] !== 'success'
    || !is_int($transaction['amount'])
    || $transaction['amount'] !== $data['amount']
    || $transaction['currency'] !== 'NGN'
    || !is_string($transaction['customer']['email'])
    || strcasecmp($transaction['customer']['email'], $data['email']) !== 0) {
    error_log('Paystack transaction did not match the requested payment.');
    respond(422, 'Payment was not verified against the supplied details. Please contact support with your reference.');
}

respond(200, 'Payment verified with Paystack.', [
    'reference' => $transaction['reference'],
    'amount' => $transaction['amount'],
    'currency' => $transaction['currency']
]);
