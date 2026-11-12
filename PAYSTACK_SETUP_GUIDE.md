# 🚀 Complete Paystack Integration Guide for brainboxX

## Table of Contents
1. [Getting Started](#getting-started)
2. [Step-by-Step Setup](#step-by-step-setup)
3. [Configuration](#configuration)
4. [Implementation](#implementation)
5. [Testing](#testing)
6. [Going Live](#going-live)
7. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What is Paystack?
Paystack is Nigeria's leading payment gateway that allows you to:
- Accept credit/debit card payments
- Accept bank transfers
- Accept USSD payments
- Accept QR code payments
- Manage customer payments securely
- Get instant payment notifications

### Why Paystack?
✅ **Secure** - PCI DSS Level 1 compliant
✅ **Fast** - Payments processed instantly
✅ **Trusted** - Used by 1000+ businesses in Nigeria
✅ **Multi-channel** - Cards, Bank, USSD, QR codes
✅ **24/7 Support** - Always available to help

---

## Step-by-Step Setup

### STEP 1: Create a Paystack Account

1. **Visit Paystack**: Go to https://paystack.com
2. **Sign Up**: Click "Create Free Account"
3. **Fill Details**:
   - Email address
   - Password
   - Accept terms and conditions
4. **Verify Email**: Check your email and verify your account
5. **Complete KYC**: Fill in your business information:
   - Business name
   - Business type
   - Phone number
   - Address

**Time needed**: ~15 minutes

---

### STEP 2: Get Your API Keys

**IMPORTANT**: Keep your Secret Key private! Never expose it in frontend code.

1. **Go to Dashboard**: https://dashboard.paystack.com
2. **Navigate to Settings**: 
   - Click "Settings" in the left sidebar
   - Select "Developers" or "API Keys"
3. **Find Your Keys**:
   - **Public Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

### Key Types:
| Key Type | Public/Secret | Use Case | Environment |
|----------|---------------|----------|-------------|
| `pk_test_*` | Public | Testing | Testing/Sandbox |
| `sk_test_*` | Secret | Testing | Testing/Sandbox |
| `pk_live_*` | Public | Production | Live |
| `sk_live_*` | Secret | Production | Live |

**⚠️ SECURITY WARNING**: 
- Use `pk_test_` keys for development/testing
- Use `pk_live_` keys only when you're ready for real payments
- NEVER commit secret keys to version control
- NEVER expose secret keys in frontend code

---

## Configuration

### Step 1: Add Configuration File

The configuration file has already been created: `paystack-config.js`

### Step 2: Update Your Public Key

**Location**: `paystack-config.js`, line 11

```javascript
credentials: {
    // Replace 'YOUR_PUBLIC_KEY_HERE' with your actual public key
    publicKey: 'pk_test_YOUR_PUBLIC_KEY_HERE', // e.g., pk_test_4a7f7k2x9c1b8d5e
    secretKey: 'sk_test_YOUR_SECRET_KEY_HERE',  // Backend only!
},
```

**How to update**:
1. Open `paystack-config.js` in your editor
2. Find line 11
3. Replace `'pk_test_YOUR_PUBLIC_KEY_HERE'` with your actual public key from Paystack dashboard
4. Example: `publicKey: 'pk_test_4a7f7k2x9c1b8d5e'`

### Step 3: Verify Configuration

After updating, test if it's configured correctly:

```javascript
// Open browser console and run:
PaystackConfig.logStatus();

// You should see:
// ✅ Configured: Yes
```

---

## Implementation

### Files You Need to Include

In your HTML pages that need payment functionality, include these files in this order:

```html
<!-- 1. Paystack SDK (from CDN) -->
<script src="https://js.paystack.co/v1/inline.js"></script>

<!-- 2. Your Configuration -->
<script src="paystack-config.js"></script>

<!-- 3. Payment Handler -->
<script src="paystack-handler.js"></script>

<!-- 4. Checkout Handler (if using checkout page) -->
<script src="checkout-handler.js"></script>
```

### Integration Points

#### A. In Your Marketplace/Product Pages

When a user clicks "Buy Now":

```html
<!-- On your product card -->
<button 
    data-buy-now
    data-product-id="product-123"
    data-product-name="Beautiful Picture Frame"
    data-product-price="2500"
    data-category="gifts"
>
    Buy Now - ₦2,500
</button>
```

**How it works**:
1. User clicks "Buy Now"
2. Product details stored in localStorage
3. User redirected to checkout page
4. Checkout page displays order summary
5. User fills in customer info
6. User clicks "Pay with Paystack"
7. Paystack popup opens
8. User completes payment
9. Redirected to success/failure page

#### B. Checkout Page (`checkout-paystack.html`)

The checkout page is already configured. It:
- Displays order summary
- Collects customer information
- Integrates Paystack payment
- Handles payment confirmation

**To use it**:
1. Link your "Buy Now" buttons to this page
2. Include the necessary script files
3. Users will see the checkout form

#### C. Payment Buttons in Code

If you want to trigger payment programmatically:

```javascript
// Basic payment
PaystackHandler.initiatePayment({
    email: 'customer@example.com',
    total: 5000,  // Amount in Naira
    customerName: 'John Doe',
    phone: '+234 801 234 5678'
});

// With callback
PaystackHandler.initiatePayment(
    {
        email: 'customer@example.com',
        total: 5000,
        customerName: 'John Doe'
    },
    function(payment) {
        // Success callback
        console.log('Payment successful:', payment);
    },
    function(error) {
        // Failure callback
        console.log('Payment failed:', error);
    }
);
```

### Payment Flow Diagram

```
User on Product Page
        ↓
    Click "Buy Now"
        ↓
Order stored in localStorage
        ↓
Redirect to Checkout Page
        ↓
Display Order Summary
        ↓
User fills customer info
        ↓
    Click "Pay with Paystack"
        ↓
Paystack Popup Opens
        ↓
User selects payment method:
├── 💳 Card
├── 🏦 Bank Transfer
├── 📱 USSD
└── 🤖 QR Code
        ↓
User completes payment
        ↓
Payment verified on server
        ↓
Redirect to Success/Failure Page
        ↓
    Show Confirmation
```

---

## Testing

### Test Cards for Paystack

Use these cards to test payments without real money:

#### Successful Payment
- **Card Number**: 4084084084084081
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)
- **OTP**: 123456

#### Failed Payment
- **Card Number**: 5555555555554444
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: 000000

### Testing Steps

1. **Go to Checkout Page**: `checkout-paystack.html`
2. **Fill in Details**:
   - Name: Test Customer
   - Email: test@example.com
   - Phone: +234 801 234 5678
   - Address: Test Address
3. **Click "Pay with Paystack"**
4. **Enter Test Card Details** (from above)
5. **Complete Payment**
6. **Verify Success/Failure Page**

### What to Check
✅ Order summary displays correctly
✅ Payment popup opens
✅ Test card payment succeeds
✅ Redirects to success page
✅ Success page shows correct details

---

## Going Live

### Step 1: Activate Live Account

1. Go to Paystack Dashboard
2. Click on your account icon
3. Select "Settings" → "API Keys"
4. Request to go live (you'll need to:
   - Verify your identity
   - Submit business documents
   - Wait for Paystack approval, usually 2-3 days)

### Step 2: Get Live Keys

Once approved, you'll have:
- **Live Public Key** (starts with `pk_live_`)
- **Live Secret Key** (starts with `sk_live_`)

### Step 3: Update Configuration

**Production Setup** - Create a backend PHP/Node.js file to store secrets:

```php
// payment-verify.php (BACKEND ONLY)
<?php
$secretKey = 'sk_live_YOUR_LIVE_SECRET_KEY'; // Keep this on server only

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $reference = $_POST['reference'];
    
    // Verify payment
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.paystack.co/transaction/verify/" . $reference,
        CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
        CURLOPT_USERPWD => $secretKey,
        CURLOPT_RETURNTRANSFER => true,
    ));
    
    $response = curl_exec($curl);
    // Handle response...
}
```

### Step 4: Update Frontend Configuration

In `paystack-config.js`:

```javascript
credentials: {
    publicKey: 'pk_live_YOUR_LIVE_PUBLIC_KEY', // Your live public key
    secretKey: 'sk_live_YOUR_LIVE_SECRET_KEY',  // Only on backend!
},
```

### Step 5: Test on Live

1. Make a small test payment with real card
2. Verify transaction in dashboard
3. Check that payment confirmation works
4. Monitor first few transactions

---

## Troubleshooting

### Common Issues & Solutions

#### ❌ "Payment gateway not configured"

**Problem**: Error message says payment gateway is not configured

**Solution**:
```javascript
// Check configuration
PaystackConfig.logStatus();

// Make sure public key is set correctly in paystack-config.js
// Should look like: pk_test_1234567890abcdef (not with YOUR_PUBLIC_KEY_HERE)
```

#### ❌ "Paystack script not loaded"

**Problem**: Payment popup doesn't open

**Solution**: Make sure Paystack SDK is loaded FIRST:
```html
<!-- Add BEFORE your scripts -->
<script src="https://js.paystack.co/v1/inline.js"></script>
```

#### ❌ "Payment verification failed"

**Problem**: Payment completes but verification fails

**Solution**: 
- Make sure `payment-verify.php` exists on your server
- Check that backend can access Paystack API
- Verify your secret key is correct on backend

#### ❌ "Insufficient data"

**Problem**: When trying to pay, get validation error

**Solution**: Make sure all required fields are filled:
```javascript
// Required:
{
    email: 'customer@example.com',  // Valid email
    total: 5000,                     // Number > 0
    customerName: 'John Doe'         // Non-empty string
}
```

#### ❌ "Amount too small/too large"

**Problem**: Error about amount limits

**Limits in Nigeria (Paystack)**:
- **Minimum**: ₦100
- **Maximum**: ₦50,000,000

**Solution**: Make sure payment amount is between these limits.

### Debug Mode

Enable detailed logging:

```javascript
// In browser console
PaystackConfig.logStatus();     // Shows config
PaystackHandler.logStatus();    // Shows handler status

// Check last payment
PaystackHandler.getLastPayment();
```

### Support Resources

- **Paystack Documentation**: https://paystack.com/docs
- **Paystack Status Page**: https://status.paystack.com
- **Contact Paystack**: support@paystack.com

---

## How Payments Are Processed

### Step-by-Step Process

```
CUSTOMER INITIATES PAYMENT
        ↓
   ┌────────────────────────────────────┐
   │  Frontend (Your Website)           │
   │  ┌──────────────────────────────┐  │
   │  │ 1. Collect customer info     │  │
   │  │ 2. Validate amount & email   │  │
   │  │ 3. Initialize Paystack       │  │
   │  │ 4. Open payment popup        │  │
   │  └──────────────────────────────┘  │
   └────────────────────────────────────┘
                    ↓
   ┌────────────────────────────────────┐
   │  Paystack Payment Gateway          │
   │  (Secure Server - PCI Compliant)   │
   │  ┌──────────────────────────────┐  │
   │  │ 5. Display payment methods   │  │
   │  │ 6. Process payment           │  │
   │  │ 7. Return confirmation       │  │
   │  └──────────────────────────────┘  │
   └────────────────────────────────────┘
                    ↓
   ┌────────────────────────────────────┐
   │  Your Backend Server               │
   │  ┌──────────────────────────────┐  │
   │  │ 8. Verify payment reference  │  │
   │  │ 9. Check with Paystack API   │  │
   │  │ 10. Update order status      │  │
   │  │ 11. Send confirmation email  │  │
   │  └──────────────────────────────┘  │
   └────────────────────────────────────┘
                    ↓
   ┌────────────────────────────────────┐
   │  Frontend (Customer)               │
   │  ┌──────────────────────────────┐  │
   │  │ 12. Show success/failure     │  │
   │  │ 13. Redirect to dashboard    │  │
   │  └──────────────────────────────┘  │
   └────────────────────────────────────┘
                    ↓
           PAYMENT COMPLETE
```

### What Happens at Each Step

1. **Customer enters details** - Name, email, phone, address
2. **Frontend validates** - Checks all required fields
3. **Paystack popup opens** - Customer sees secure payment screen
4. **Customer chooses method** - Card, Bank, USSD, or QR
5. **Payment is processed** - Money moves from customer's account
6. **Backend verifies** - Your server confirms with Paystack
7. **Order is updated** - Mark as paid in your system
8. **Confirmation sent** - Email to customer with order details
9. **Success page shown** - Customer sees confirmation

---

## Key Security Points

### Frontend (paystack-config.js)
- ✅ **Public Key ONLY** - Can be exposed
- ✅ **Customer information** - Collected but not stored
- ✅ **Paystack SDK** - Handles card details securely

### Backend (Server)
- 🔒 **Secret Key ONLY** - Never in frontend
- 🔒 **Verify payments** - Always verify on backend
- 🔒 **Store order data** - Database on your server
- 🔒 **Send confirmations** - Securely via email/SMS

### Payment Flow
- 🔒 Card details **never touch your server**
- 🔒 Paystack handles **all payment processing**
- 🔒 Your server only **verifies transactions**
- 🔒 SSL/TLS **encrypts all communication**

---

## Next Steps

### Quick Start Checklist
- [ ] Sign up for Paystack account
- [ ] Get API keys from Paystack dashboard
- [ ] Update public key in `paystack-config.js`
- [ ] Test with test card on `checkout-paystack.html`
- [ ] Verify success/failure pages work
- [ ] Set up backend verification (`payment-verify.php`)
- [ ] Request live account activation
- [ ] Update keys for production
- [ ] Test with real payment (small amount)
- [ ] Monitor transactions in dashboard

### Files Summary

| File | Purpose | Status |
|------|---------|--------|
| `paystack-config.js` | Configuration & API keys | ✅ Ready |
| `paystack-handler.js` | Payment processing logic | ✅ Ready |
| `checkout-paystack.html` | Checkout page with Paystack | ✅ Ready |
| `payment-success.html` | Success confirmation page | ✅ Ready |
| `payment-failure.html` | Failure information page | ✅ Ready |
| `payment-handler.js` | Order management (existing) | ✅ Ready |
| `checkout-handler.js` | Checkout flow (existing) | ✅ Ready |

---

## Support & Contact

For issues or questions:
1. **Check Troubleshooting** section above
2. **Visit Paystack Docs**: https://paystack.com/docs
3. **Contact Paystack Support**: support@paystack.com
4. **Contact Us**: support@brainboxx.com

---

## Summary

Your brainboxX marketplace is now configured to accept payments through Paystack! 🎉

**Key Points**:
- ✅ Secure payment processing
- ✅ Multiple payment methods
- ✅ Real-time verification
- ✅ Professional success/failure pages
- ✅ Customer confirmation emails
- ✅ Complete order management

**Next Action**: Update your public key in `paystack-config.js` and start testing!

Questions? Check the troubleshooting section or contact Paystack support.

---

*Last updated: 2026*
*Paystack Integration v1.0*
