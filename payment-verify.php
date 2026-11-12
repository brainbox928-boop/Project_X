<?php
/**
 * Backend Payment Verification - payment-verify.php
 * 
 * This file should be placed on your server to verify payments with Paystack
 * 
 * IMPORTANT: 
 * - Replace 'sk_test_YOUR_SECRET_KEY' with your actual Paystack secret key
 * - This should ONLY be on your backend/server (never in frontend code)
 * - For testing: use sk_test_* keys
 * - For production: use sk_live_* keys
 * 
 * Usage:
 * POST to /payment-verify.php with JSON:
 * {
 *   "reference": "BRAINBOXX-123456-ABC",
 *   "email": "customer@example.com",
 *   "orderId": "ORDER-1234567890"
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "verified": true,
 *   "amount": 5000,
 *   "message": "Payment verified successfully"
 * }
 */

// Enable error reporting during development (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Set response header to JSON
header('Content-Type: application/json');

// SECURITY: Enable CORS only for your domain
header('Access-Control-Allow-Origin: https://yourdomain.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Use POST only.',
        'verified' => false
    ]);
    exit;
}

// ==========================================
// CONFIGURATION - UPDATE WITH YOUR KEYS
// ==========================================

// Your Paystack Secret Key (KEEP THIS SAFE!)
// Get this from: https://dashboard.paystack.com/#/settings/developer
// Development: sk_test_*
// Production: sk_live_*
$PAYSTACK_SECRET_KEY = 'sk_test_YOUR_SECRET_KEY_HERE';

// Paystack API endpoints
$PAYSTACK_API_URL = 'https://api.paystack.co/transaction/verify';

// ==========================================
// PROCESS VERIFICATION REQUEST
// ==========================================

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validate input
    if (!$data || !isset($data['reference'])) {
        throw new Exception('Missing payment reference');
    }

    $reference = trim($data['reference']);
    $email = isset($data['email']) ? trim($data['email']) : '';
    $orderId = isset($data['orderId']) ? trim($data['orderId']) : '';

    // Validate reference format
    if (empty($reference)) {
        throw new Exception('Invalid payment reference');
    }

    // ==========================================
    // VERIFY WITH PAYSTACK API
    // ==========================================

    // Build verification URL
    $verifyUrl = $PAYSTACK_API_URL . '/' . urlencode($reference);

    // Initialize cURL
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => $verifyUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer ' . $PAYSTACK_SECRET_KEY,
            'Content-Type: application/json'
        )
    ));

    // Execute request
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $curlError = curl_error($curl);
    curl_close($curl);

    // Check for cURL errors
    if ($curlError) {
        throw new Exception('Connection error: ' . $curlError);
    }

    // Parse response
    $paystackResponse = json_decode($response, true);

    if (!$paystackResponse) {
        throw new Exception('Invalid response from Paystack');
    }

    // ==========================================
    // VERIFY PAYMENT STATUS
    // ==========================================

    $verified = false;
    $amount = 0;
    $message = 'Payment verification failed';

    if ($httpCode === 200 && isset($paystackResponse['status']) && $paystackResponse['status'] === true) {
        $transaction = $paystackResponse['data'];

        // Check if payment was successful
        if ($transaction['status'] === 'success') {
            $verified = true;
            $amount = $transaction['amount'] / 100; // Convert from kobo to Naira
            $message = 'Payment verified successfully';

            // ==========================================
            // ADDITIONAL VERIFICATION (RECOMMENDED)
            // ==========================================

            // Verify email matches (optional but recommended)
            if ($email && $transaction['customer']['email'] !== $email) {
                // Email mismatch - still verified but log warning
                error_log("Warning: Email mismatch for reference: $reference");
            }

            // ==========================================
            // UPDATE YOUR DATABASE
            // ==========================================

            // Example: Update order status in your database
            // $pdo->prepare("UPDATE orders SET status = 'paid', reference = ? WHERE id = ?")
            //     ->execute([$reference, $orderId]);

            // Example: Send confirmation email
            // mail($email, 'Payment Confirmed', 'Your payment has been received. Order ID: ' . $orderId);

            // Log successful payment
            error_log("Payment verified - Reference: $reference, Amount: $amount NGN, Email: $email");
        } else {
            $message = 'Payment status: ' . $transaction['status'];
        }
    } else {
        $message = 'Payment not found or verification failed';
    }

    // ==========================================
    // SEND RESPONSE
    // ==========================================

    http_response_code(200);
    echo json_encode([
        'status' => $verified ? 'success' : 'error',
        'verified' => $verified,
        'reference' => $reference,
        'amount' => $amount,
        'email' => $email,
        'orderId' => $orderId,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    // Error handling
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'verified' => false,
        'message' => 'Verification error: ' . $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);

    // Log error
    error_log('Payment verification error: ' . $e->getMessage());
}

?>
