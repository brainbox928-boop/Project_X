# 🚀 PAYSTACK INTEGRATION - COMPLETE DEPLOYMENT GUIDE

## Pro Hub deployment notes

- Upload `brainboxX-pro-hub.html`, `style.css`, `theme-toggle.js`, `checkout.html`, `payment-success.html`, `payment-verify.php`, and `paystack-config.js` together, preserving their relative paths.
- Test the Pro Hub at desktop and mobile viewport sizes, including 320 px width. Check the theme toggle, service dialog, keyboard navigation, quote links, footer, and a test-mode checkout.
- Set `PAYSTACK_SECRET_KEY` in the PHP server environment to the rotated secret key matching the configured public key's test or live mode. PHP cURL is required; opening HTML via `file://` cannot run verification.
- The result page calls the verifier and shows a verified payment only after Paystack confirms its reference, email, amount and currency. No order confirmation email is sent.
- The amount is supplied by the browser, not an authoritative server-side order. Implement server-side pricing, order persistence and payment reconciliation before live fulfillment.
- Service orders add no shipping and add 7.5% VAT. Confirm the correct tax treatment before deployment. Service details are sent as Paystack metadata.
- A test secret key was previously exposed in project files. Rotate it in Paystack and configure the replacement securely on the server; never put a secret key in public files.

## ⚡ PHASE 1: IMMEDIATE TESTING (Right Now - 5 minutes)

### Test File Locations:
```
📁 C:\Users\HomePC\Desktop\Project_X\Project_X\
├── paystack-quick-test.html          ← START HERE! 🎯
├── marketplace-with-paystack.html    ← Full shopping
├── checkout-paystack.html             ← Checkout page
├── payment-success.html               ← Success confirmation
└── payment-failure.html               ← Failure handling
```

### 3-Step Quick Start:
1. **Open browser** → `paystack-quick-test.html`
2. **Click "Quick Test"** button
3. **Enter test card**: `4084084084084081` → Watch success page! ✅

---

## 📋 PHASE 2: PRODUCT INTEGRATION (10 minutes)

### Already Created:
✅ **marketplace-with-paystack.html** - Full shopping cart system
- 8 sample products with prices
- Shopping cart with totals
- One-click checkout
- Mobile responsive

### Files Already In Place:
```javascript
// paystack-config.js - YOUR KEYS ARE HERE ✅
publicKey: "pk_test_e9785f2a427b2eb9cae3bfd8d7eb7a09576fb372"
storageKey: "brainboxX-pending-order"

// payment-verify.php - BACKEND VERIFICATION
// Configure the rotated secret key securely on the server.
```

### To Add Paystack to Existing Product Pages:

**ADD THIS TO YOUR PRODUCT PAGE HEAD:**
```html
<script src="paystack-config.js"></script>
<script src="paystack-handler.js"></script>
```

**ADD THIS BUTTON TO EACH PRODUCT:**
```html
<button onclick="addToCheckout(productName, productPrice)">
    Buy with Paystack
</button>
```

**ADD THIS SCRIPT TO PRODUCT PAGE:**
```javascript
function addToCheckout(name, price) {
    const order = {
        items: [{id: Date.now(), name: name, price: price, quantity: 1}],
        total: price,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('brainboxX-pending-order', JSON.stringify(order));
    window.location.href = 'checkout-paystack.html';
}
```

---

## 🔐 PHASE 3: SERVER DEPLOYMENT (Backend Verification)

### Prerequisites:
- Web server with PHP 7.0+ (Hostgator, Bluehost, AWS, etc.)
- FTP/cPanel access to upload files
- cURL enabled on server (usually default)

### Files to Upload:
1. **payment-verify.php** → Upload to web server ROOT
2. **paystack-config.js** → Upload to web server public folder
3. **paystack-handler.js** → Upload to web server public folder

### Upload Steps:

#### Via cPanel (Easiest):
```
1. Login to cPanel
2. File Manager → public_html
3. Click "Upload"
4. Select payment-verify.php
5. Click Upload
6. Right-click → Change Permissions → 644
```

#### Via FTP:
```
1. Connect to FTP (FileZilla recommended)
   Host: your-ftp-address
   User: your-ftp-user
   Pass: your-ftp-pass
2. Navigate to public_html/
3. Drag-and-drop payment-verify.php
```

### Verify Upload:
```
In your browser, visit:
https://yourwebsite.com/payment-verify.php

You should see:
{"error":"No reference provided"}

This means file is properly uploaded! ✅
```

### Update Frontend Code:

**In checkout-paystack.html, find:**
```javascript
const verificationUrl = 'payment-verify.php';
```

**Change to:**
```javascript
const verificationUrl = 'https://yourwebsite.com/payment-verify.php';
```

---

## 🧪 PHASE 4: FULL TESTING CHECKLIST

### Test 1: Quick Payment (Success)
- [ ] Open paystack-quick-test.html
- [ ] Click "Quick Test" 
- [ ] Use card: 4084084084084081
- [ ] See success page with reference ✅

### Test 2: Custom Amount
- [ ] Open paystack-quick-test.html
- [ ] Click "Custom Amount"
- [ ] Enter ₦15,000
- [ ] Complete payment ✅

### Test 3: Marketplace Shopping
- [ ] Open marketplace-with-paystack.html
- [ ] Add multiple products to cart
- [ ] Click "Proceed to Checkout"
- [ ] Enter customer info
- [ ] Complete payment ✅

### Test 4: Mobile Responsiveness
- [ ] Open paystack-quick-test.html on mobile device
- [ ] Verify button sizes and layout
- [ ] Test payment flow ✅

### Test 5: Backend Verification (If deployed)
- [ ] Complete a payment
- [ ] Check server logs for verification call
- [ ] Verify database records transaction ✅

---

## 💳 TEST CARD DETAILS

| Purpose | Card Number | Expiry | CVV | OTP |
|---------|------------|--------|-----|-----|
| ✅ Success | 4084084084084081 | 12/25 | 123 | 123456 |
| ❌ Failure | 5555555555554444 | 12/25 | 123 | 123456 |
| 🔄 OTP Required | 5531886652142950 | 12/25 | 123 | 123456 |

---

## 🔧 TROUBLESHOOTING

### Issue: "Paystack is not defined"
**Solution:** Make sure scripts load in order:
```html
<script src="paystack-config.js"></script>
<script src="paystack-handler.js"></script>
```

### Issue: Payment doesn't process
**Solution:** 
1. Check browser console (F12) for errors
2. Verify public key in paystack-config.js
3. Clear localStorage: `localStorage.clear()`
4. Refresh page and retry

### Issue: Order summary not showing
**Solution:**
1. Check if data in localStorage: `console.log(localStorage.getItem('brainboxX-pending-order'))`
2. Verify paystack-quick-test.html created the order
3. Try starting from paystack-quick-test.html again

### Issue: Backend verification failing
**Solution:**
1. Verify payment-verify.php uploaded correctly
2. Check the `PAYSTACK_SECRET_KEY` server environment variable matches your account and mode.
3. Ensure cURL is enabled on server
4. Check server error logs for PHP errors

---

## 📊 PRODUCTION CHECKLIST

### Before Going Live:
- [ ] Request Paystack live account activation
- [ ] Get live API keys from Paystack dashboard
- [ ] Update paystack-config.js with live public key
- [ ] Configure the live secret key in the server's `PAYSTACK_SECRET_KEY` environment variable.
- [ ] Test full payment flow with live cards
- [ ] Ensure HTTPS enabled on website (required by Paystack)
- [ ] Set up payment success/failure email notifications
- [ ] Train support team on order handling
- [ ] Set up database to log transactions

### Live Key Update:
```javascript
// In paystack-config.js - CHANGE FROM:
publicKey: "pk_test_e9785f2a427b2eb9cae3bfd8d7eb7a09576fb372"

// TO:
publicKey: "pk_live_YOUR_LIVE_PUBLIC_KEY_HERE"
```

Set `PAYSTACK_SECRET_KEY` in the server's environment, not in a public file.

---

## 🎯 QUICK COMMAND REFERENCE

### Start Testing:
```bash
# On Windows - Open file explorer
C:\Users\HomePC\Desktop\Project_X\Project_X\paystack-quick-test.html

# Or run Python HTTP server
python -m http.server 8000
# Then visit: http://localhost:8000/paystack-quick-test.html
```

### Verify Server Files:
```bash
# Via SSH (if server has SSH access)
ssh user@yourhost.com
ls -la public_html/payment-verify.php
curl https://yourwebsite.com/payment-verify.php
```

### Clear Test Data:
```javascript
// Run in browser console (F12)
localStorage.clear()
location.reload()
```

---

## 📞 SUPPORT RESOURCES

### Paystack Documentation:
- Dashboard: https://dashboard.paystack.com
- Docs: https://paystack.com/docs
- Test Account Created: ✅
- Public Key: pk_test_e9785f2a427b2eb9cae3bfd8d7eb7a09576fb372
- Secret Key: sk_test_7dd33ac875eb9b63b91b6848f73ef60c79b64ee7

### Files Ready:
```
✅ paystack-quick-test.html         - One-click testing
✅ marketplace-with-paystack.html   - Shopping cart demo
✅ checkout-paystack.html           - Checkout page
✅ payment-verify.php               - Backend verification
✅ paystack-config.js               - Configuration
✅ paystack-handler.js              - Payment logic
✅ payment-success.html             - Success page
✅ payment-failure.html             - Failure page
```

---

## ⏱️ TIME ESTIMATES

| Task | Time | Status |
|------|------|--------|
| Test payment flow | 2 min | ✅ Ready |
| Integrate with products | 5 min | ✅ Ready |
| Deploy backend | 10 min | 📋 Instructions ready |
| Full testing | 15 min | ✅ Test cards available |
| Go to production | 30 min | 🔜 After testing |

**TOTAL TIME TO FULL DEPLOYMENT: ~60 minutes**

---

## 🎊 YOU'RE ALL SET!

**Next Action:** Open `paystack-quick-test.html` in your browser right now! 🚀

All files are in: `C:\Users\HomePC\Desktop\Project_X\Project_X\`

Test payment flow → Integrate products → Deploy backend → Go live!

For questions: Check PAYSTACK_SETUP_GUIDE.md or PAYSTACK_QUICK_REFERENCE.md
