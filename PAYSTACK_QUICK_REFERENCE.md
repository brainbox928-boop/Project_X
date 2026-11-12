# ⚡ Paystack Integration - Quick Reference Guide

## 🎯 Quick Links
- **Sign Up**: https://paystack.com
- **Dashboard**: https://dashboard.paystack.com
- **API Keys**: https://dashboard.paystack.com/#/settings/developer
- **Documentation**: https://paystack.com/docs
- **Support**: support@paystack.com

---

## 🚀 5-Minute Setup

### 1️⃣ Create Account (2 min)
```
Go to https://paystack.com → Click "Create Free Account" → Verify Email
```

### 2️⃣ Get API Keys (1 min)
```
Dashboard → Settings → API Keys → Copy Public Key (pk_test_*)
```

### 3️⃣ Update Configuration (1 min)
```
File: paystack-config.js
Line 11: Replace 'YOUR_PUBLIC_KEY_HERE' with your actual key

Example:
publicKey: 'pk_test_4a7f7k2x9c1b8d5e'
```

### 4️⃣ Test Payment (1 min)
```
Go to checkout-paystack.html → Fill form → Click "Pay with Paystack"
Use test card: 4084084084084081, Expiry: 12/25, CVV: 123, OTP: 123456
```

✅ **Done!** Your Paystack integration is ready to test!

---

## 📋 File Locations

```
Project_X/
├── paystack-config.js          ← Configuration (UPDATE THIS)
├── paystack-handler.js         ← Payment processing
├── checkout-paystack.html      ← Checkout page
├── payment-success.html        ← Success page
├── payment-failure.html        ← Failure page
├── payment-verify.php          ← Backend verification
└── PAYSTACK_SETUP_GUIDE.md     ← Full documentation
```

---

## 🔑 API Keys Cheat Sheet

### Where to Find Them
1. Login to https://dashboard.paystack.com
2. Click "Settings" (gear icon)
3. Click "Developers" or "API Keys"
4. Copy your keys

### Key Formats
| Key | Format | Location | Use |
|-----|--------|----------|-----|
| Public | `pk_test_*` | Frontend | Payment popup |
| Secret | `sk_test_*` | Backend ONLY | Verification |

### Environments
| Environment | Public Key | Secret Key | Real Money |
|-------------|-----------|-----------|-----------|
| Testing | `pk_test_*` | `sk_test_*` | ❌ No |
| Production | `pk_live_*` | `sk_live_*` | ✅ Yes |

---

## 🧪 Test Credentials

### Test Card (Success)
```
Card Number: 4084084084084081
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
OTP: 123456
Result: ✅ Payment successful
```

### Test Card (Failure)
```
Card Number: 5555555555554444
Expiry: Any future date
CVV: Any 3 digits
OTP: 000000
Result: ❌ Payment declined
```

### Test Bank Transfer
- Go to Paystack test dashboard
- Transfer ₦50 to test bank account
- Confirm transfer in dashboard

---

## 💻 Code Examples

### Example 1: Simple Buy Button
```html
<button 
    data-buy-now
    data-product-id="gift-001"
    data-product-name="Beautiful Gift"
    data-product-price="3500"
>
    Buy Now - ₦3,500
</button>
```

### Example 2: Direct Payment
```javascript
// Trigger payment directly
PaystackHandler.initiatePayment({
    email: 'customer@example.com',
    total: 5000,
    customerName: 'John Doe',
    phone: '+234 801 234 5678'
});
```

### Example 3: Payment with Callbacks
```javascript
PaystackHandler.initiatePayment(
    {
        email: 'customer@example.com',
        total: 5000,
        customerName: 'John Doe'
    },
    // Success callback
    function(payment) {
        console.log('✅ Payment successful!', payment);
        // Send order to database, email customer, etc.
    },
    // Failure callback
    function(error) {
        console.log('❌ Payment failed:', error);
        // Show error message to user
    }
);
```

---

## 🔒 Security Checklist

### ✅ DO's
- ✅ Use `pk_test_*` keys for development
- ✅ Use `pk_live_*` keys only for production
- ✅ Keep secret keys on backend only
- ✅ Verify payments on your backend
- ✅ Use HTTPS for all payments
- ✅ Store orders in your database
- ✅ Validate email addresses
- ✅ Send confirmation emails

### ❌ DON'Ts
- ❌ Never expose secret keys in frontend code
- ❌ Never commit keys to version control
- ❌ Never trust only frontend verification
- ❌ Never store card details yourself
- ❌ Never use production keys for testing
- ❌ Never skip email verification

---

## 🐛 Troubleshooting Quick Guide

### Problem: "Payment gateway not configured"
**Solution**: Update public key in `paystack-config.js`
```javascript
// Check this is correct:
publicKey: 'pk_test_4a7f7k2x9c1b8d5e'  // ✅ Correct
publicKey: 'pk_test_YOUR_PUBLIC_KEY_HERE'  // ❌ Wrong
```

### Problem: Paystack popup doesn't open
**Solution**: Add Paystack SDK first
```html
<script src="https://js.paystack.co/v1/inline.js"></script>
<!-- Add this BEFORE your other scripts -->
```

### Problem: Verification fails after payment
**Solution**: Create `payment-verify.php` on your server
```php
// In payment-verify.php:
$PAYSTACK_SECRET_KEY = 'sk_test_YOUR_SECRET_KEY';
// Update with your actual secret key
```

### Problem: Amount too small
**Solution**: Minimum is ₦100
```javascript
// ❌ Too small
amount: 50  // Less than ₦100

// ✅ Correct
amount: 100  // ₦100 or more
```

### Problem: Test card not working
**Solution**: Use exact test card details
```
Card: 4084084084084081  (exactly this number)
Expiry: 12/25  (or any future date)
CVV: 123  (any 3 digits)
OTP: 123456  (check Paystack dashboard for OTP)
```

---

## 📊 Payment Flow Summary

```
User clicks "Buy Now"
           ↓
Order saved to browser
           ↓
Checkout page opens
           ↓
User fills customer info
           ↓
User clicks "Pay with Paystack"
           ↓
Paystack popup opens (secure)
           ↓
User enters card details (encrypted by Paystack)
           ↓
Paystack processes payment
           ↓
Frontend receives confirmation
           ↓
Backend verifies with Paystack API
           ↓
Order marked as paid
           ↓
Confirmation email sent
           ↓
Success page shown ✅
```

---

## 📞 When to Contact Support

### Contact Paystack if:
- You can't sign up for an account
- You can't find your API keys
- Payment verification fails
- You're getting API errors
- Account getting declined for approval

**Paystack Support**: support@paystack.com
**Paystack Status**: https://status.paystack.com

### Contact Us if:
- Checkout page has issues
- Integration isn't working
- Need help setting up
- Want custom features

**Email**: support@brainboxx.com
**WhatsApp**: +234 801 234 5678

---

## 📈 Going Live Checklist

- [ ] Create Paystack account
- [ ] Test with test keys successfully
- [ ] Request live account (Paystack)
- [ ] Paystack approves (2-3 days)
- [ ] Get live keys (`pk_live_*`, `sk_live_*`)
- [ ] Update configuration with live keys
- [ ] Update backend verification with secret key
- [ ] Test with small real payment
- [ ] Monitor first transactions
- [ ] Set up order notifications
- [ ] Enable email confirmations

---

## 💰 Paystack Fees in Nigeria

| Amount | Commission | Example |
|--------|-----------|---------|
| ₦0 - ₦2,500 | Flat ₦50 | ₦2,500 → +₦50 |
| ₦2,501+ | 1.5% | ₦5,000 → +₦75 |

Your `paystack-config.js` automatically calculates this!

---

## 🎓 Payment Methods Supported

| Method | Time | Fee | Limits |
|--------|------|-----|--------|
| **Debit Card** | Instant | 1.5% | Up to ₦50M |
| **Credit Card** | Instant | 1.5% | Up to ₦50M |
| **Bank Transfer** | 1-2 hours | Included | Variable |
| **USSD** | Instant | Included | Varies by bank |
| **QR Code** | Instant | 1.5% | Variable |

All methods work automatically through Paystack!

---

## 🔄 Payment Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| `success` | Payment completed | Fulfill order ✅ |
| `pending` | Awaiting verification | Wait or check later |
| `failed` | Payment declined | Ask customer to retry |
| `abandoned` | User closed popup | Remind customer to complete |

---

## 📱 Mobile Optimization

Your checkout page is mobile-responsive:
- ✅ Forms stack on small screens
- ✅ Paystack popup works on mobile
- ✅ Success/failure pages are mobile-friendly
- ✅ Touch-friendly buttons and inputs

---

## 🚀 Pro Tips

1. **Test thoroughly** before going live
2. **Add success email notifications** to build trust
3. **Display payment reference** to customer for support
4. **Handle network errors** gracefully
5. **Save order locally** before payment
6. **Monitor failed payments** in dashboard
7. **Reply to support emails** quickly
8. **Use analytics** to track conversion rates

---

## 📚 Additional Resources

- **Paystack API Docs**: https://paystack.com/docs
- **Test Transactions**: https://dashboard.paystack.com/test-payments
- **Webhook Setup**: https://paystack.com/docs/webhooks
- **SDK Repos**: https://github.com/PaystackHQ
- **Community Forums**: https://github.com/PaystackHQ/paystack-python/discussions

---

## 🎉 You're All Set!

Your brainboxX marketplace now accepts secure payments through Paystack!

**Next Steps**:
1. Update your public key in `paystack-config.js`
2. Test with a test card
3. Deploy to live environment
4. Monitor your transactions
5. Celebrate your first payment! 🎊

---

*Quick Reference v1.0 | Last Updated: 2026*
*For full documentation, see PAYSTACK_SETUP_GUIDE.md*
