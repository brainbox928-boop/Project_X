# 🏗️ brainboxX Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER / CLIENT SIDE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │   brainboxtools.html │  │  gifts-delivery.html │  ... (15+)  │
│  │   (Landing Page)     │  │   (Gifts Category)   │             │
│  └──────────────────────┘  └──────────────────────┘             │
│           │                       │                              │
│           └───────────┬───────────┘                              │
│                       ▼                                           │
│        ┌──────────────────────────┐                              │
│        │   Shared CSS/JavaScript  │                              │
│        ├──────────────────────────┤                              │
│        │ • style.css              │                              │
│        │ • script.js              │                              │
│        │ • marketplace.js         │                              │
│        │ • Modal System           │                              │
│        │ • Cart Management        │                              │
│        │ • Image Handling         │                              │
│        └──────────────────────────┘                              │
│                       │                                           │
│                       ▼                                           │
│        ┌──────────────────────────┐                              │
│        │   localStorage (Cart)    │                              │
│        │   Temporary User State   │                              │
│        └──────────────────────────┘                              │
│                       │                                           │
│                       ▼  (API Calls via Fetch/Axios)             │
│                       │                                           │
└───────────────┬───────┼────────────────────────────┬─────────────┘
                │       │                            │
                │  HTTP │ REQUESTS/RESPONSES         │
                │       │                            │
                ▼       ▼                            ▼
        
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND / SERVER SIDE                       │
│                      (Node.js + Express)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                    ┌─────────────────────────┐                   │
│                    │   Express Server        │                   │
│                    │   (Port 5000)           │                   │
│                    └────────────┬────────────┘                   │
│                                 │                                │
│        ┌────────────────────────┼────────────────────────┐       │
│        │                        │                        │       │
│        ▼                        ▼                        ▼       │
│    ┌─────────────┐      ┌──────────────┐      ┌──────────────┐  │
│    │ Auth Routes │      │ Product      │      │ Order Routes │  │
│    │             │      │ Routes       │      │              │  │
│    │ /register   │      │              │      │ /create      │  │
│    │ /login      │      │ /products    │      │ /history     │  │
│    │ /logout     │      │ /search      │      │ /status      │  │
│    └────────┬────┘      └──────┬───────┘      └──────┬───────┘  │
│             │                  │                     │           │
│             └──────────────────┼─────────────────────┘           │
│                                │                                │
│                                ▼                                │
│        ┌──────────────────────────────────────────┐             │
│        │   Controllers (Business Logic)            │             │
│        ├──────────────────────────────────────────┤             │
│        │ • authController (JWT generation)        │             │
│        │ • productController (DB queries)         │             │
│        │ • orderController (Order processing)     │             │
│        └──────────────────┬───────────────────────┘             │
│                           │                                     │
│        ┌──────────────────┴──────────────────┐                  │
│        │                                     │                  │
│        ▼                                     ▼                  │
│   ┌──────────────┐              ┌──────────────────────┐       │
│   │  Middleware  │              │    Models            │       │
│   ├──────────────┤              ├──────────────────────┤       │
│   │ • JWT Auth   │              │ • User Model         │       │
│   │ • CORS       │              │ • Product Model      │       │
│   │ • Error      │              │ • Order Model        │       │
│   │   Handler    │              │ • Payment Model      │       │
│   └──────────────┘              └──────────┬───────────┘       │
│                                            │                    │
│                                            ▼                    │
│                            ┌──────────────────────────┐         │
│                            │   Data Validation        │         │
│                            │   & Encryption           │         │
│                            │   (bcryptjs)             │         │
│                            └──────────┬───────────────┘         │
│                                       │                         │
│                                       ▼                         │
│                   ┌─────────────────────────────┐               │
│                   │   MongoDB Connection        │               │
│                   │   (Mongoose ODM)            │               │
│                   └──────────────┬──────────────┘               │
│                                  │                              │
│                                  ▼                              │
│              ┌────────────────────────────────┐                 │
│              │   MongoDB Database             │                 │
│              ├────────────────────────────────┤                 │
│              │ Collections:                   │                 │
│              │ • users (authentication)       │                 │
│              │ • products (catalog)           │                 │
│              │ • orders (transactions)        │                 │
│              │ • payments (Paystack records)  │                 │
│              └────────────────────────────────┘                 │
│                                                                  │
│              ┌────────────────────────────────┐                 │
│              │ Paystack Payment Gateway       │                 │
│              │ (Via API calls)                │                 │
│              └────────────────────────────────┘                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: User Journey

### 🔐 Authentication Flow

```
User Opens checkout.html
        │
        ▼
Click "Sign Up" Button
        │
        ▼
Modal opens with form
        │
        ▼
User enters: Email, Password
        │
        ▼
Submit form → JavaScript catches event
        │
        ▼
Fetch POST to /api/auth/register
        │
        ▼
Backend validates input
        │
        ▼
Hash password with bcryptjs
        │
        ▼
Save User to MongoDB
        │
        ▼
Generate JWT token
        │
        ▼
Return token to frontend
        │
        ▼
JavaScript stores token in localStorage
        │
        ▼
User is authenticated ✅
```

---

### 🛍️ Shopping Flow

```
Browse gifts-delivery.html
        │
        ▼
View products with marketplace.js catalog
        │
        ▼
Click "Add to Cart"
        │
        ▼
Item added to localStorage (temporary)
        │
        ▼
User sees cart icon updated
        │
        ▼
Click "Go to Checkout"
        │
        ▼
Redirect to checkout.html
        │
        ▼
Display cart items
        │
        ▼
Login if not authenticated
        │
        ▼
Enter delivery address
        │
        ▼
Review order
        │
        ▼
Click "Pay with Paystack"
        │
        ▼
Paystack modal opens
        │
        ▼
User enters payment details
        │
        ▼
Paystack processes payment
        │
        ▼
Backend receives webhook confirmation
        │
        ▼
Order saved to MongoDB
        │
        ▼
User receives confirmation ✅
```

---

## Technology Stack Details

### Frontend Layer
```
├── HTML5 (Structure)
│   ├── Semantic markup
│   ├── Form validation
│   └── Accessibility (ARIA labels)
│
├── CSS3 (Styling)
│   ├── Responsive Grid/Flexbox
│   ├── Mobile-first approach
│   ├── Custom properties (CSS variables)
│   └── Animations & transitions
│
└── JavaScript (Behavior)
    ├── Vanilla JS (no frameworks)
    ├── Fetch API for HTTP requests
    ├── localStorage API for persistence
    ├── DOM manipulation
    └── Event handling
```

### Backend Layer
```
├── Node.js Runtime
│
├── Express.js Framework
│   ├── Routing
│   ├── Middleware stack
│   ├── Error handling
│   └── Request/Response pipeline
│
├── Authentication (JWT)
│   ├── Token generation
│   ├── Token verification
│   └── Authorization middleware
│
├── Security
│   ├── bcryptjs (password hashing)
│   ├── CORS (cross-origin control)
│   └── dotenv (secrets management)
│
├── Data Access
│   ├── Mongoose (MongoDB ODM)
│   ├── Schema validation
│   └── Query optimization
│
└── External Services
    ├── Paystack (payment processing)
    └── MongoDB (data persistence)
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  firstName: String,
  lastName: String,
  phone: String,
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: Boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  delivery: String,
  image: String (path),
  variants: Array,
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentStatus: String (pending, completed, failed),
  orderStatus: String (processing, shipped, delivered),
  paystackReference: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Payments Collection
```javascript
{
  _id: ObjectId,
  orderId: ObjectId (ref: Order),
  amount: Number,
  paystackReference: String,
  paystackCode: String,
  status: String (success, failed),
  method: String (card, transfer, ussd),
  processedAt: Date,
  createdAt: Date
}
```

---

## API Endpoints

### Authentication Routes
```
POST   /api/auth/register        Create new user account
POST   /api/auth/login           Login existing user
POST   /api/auth/logout          Logout user
GET    /api/auth/me              Get current user (requires JWT)
```

### Product Routes
```
GET    /api/products             Get all products
GET    /api/products/:id         Get single product
GET    /api/products/search      Search products
GET    /api/categories           Get all categories
POST   /api/products/filter      Filter by category/price
```

### Order Routes
```
POST   /api/orders               Create new order
GET    /api/orders               Get user's orders (requires JWT)
GET    /api/orders/:id           Get order details (requires JWT)
PUT    /api/orders/:id           Update order status (admin)
DELETE /api/orders/:id           Cancel order (requires JWT)
```

### Payment Routes
```
POST   /api/payments/initialize  Initialize Paystack payment
POST   /api/payments/verify      Verify payment completion
GET    /api/payments/:reference  Get payment details
```

---

## Security Architecture

```
Request comes in
      │
      ▼
CORS Middleware Check
      ├─ Valid origin? Yes ─→ Continue
      └─ No ──────────────→ Reject (403)
      
      ▼
Parse Request Body
      │
      ▼
Input Validation
      ├─ Valid data? Yes ─→ Continue
      └─ No ──────────────→ Return Error (400)

      ▼
JWT Authentication (if protected route)
      ├─ Token exists? Yes ─→ Verify JWT
      │                          ├─ Valid? Yes ─→ Continue
      │                          └─ No ────────→ Reject (401)
      └─ No ──────────────→ Reject (401)

      ▼
Route Handler (Business Logic)
      │
      ▼
Database Operation
      ├─ Password: Hash with bcryptjs
      └─ Other data: Validate & sanitize

      ▼
Response
      └─ Return data (no sensitive info exposed)
```

---

## Deployment Architecture (When Ready)

```
┌──────────────────────────────────────────────────────┐
│              Production Deployment                    │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │   Frontend (Static Files)                      │  │
│  │   • GitHub Pages / Vercel / Netlify           │  │
│  │   • All HTML, CSS, JS served as static files   │  │
│  └────────────────────────────────────────────────┘  │
│                       │                               │
│                       ▼  (HTTPS)                      │
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │   API Server (Backend)                         │  │
│  │   • Heroku / Railway / Render                  │  │
│  │   • Node.js + Express running                  │  │
│  └────────────────────────────────────────────────┘  │
│                       │                               │
│                       ▼                               │
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │   Database (MongoDB)                           │  │
│  │   • MongoDB Atlas (cloud)                      │  │
│  │   • Backup & replication enabled               │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ┌────────────────────────────────────────────────┐  │
│  │   Payment Gateway                              │  │
│  │   • Paystack API (handles all payments)       │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## Environment Configuration

### Local Development (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/brainboxX
JWT_SECRET=your_local_test_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
CORS_ORIGIN=http://localhost:3000
```

### Production (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/brainboxX
JWT_SECRET=your_secure_random_string_min_32_chars
PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
CORS_ORIGIN=https://brainboxX.com
```

---

## Performance Considerations

### Frontend Optimization
- Lazy load images (only load when in viewport)
- Minify CSS/JS for production
- Cache static assets
- Use CDN for images
- Implement infinite scroll for products

### Backend Optimization
- Database indexing on frequently queried fields
- Connection pooling for MongoDB
- Redis caching for product catalog
- Pagination for large datasets
- Rate limiting on API endpoints

### Network Optimization
- GZIP compression
- HTTP/2 support
- CDN for static content
- Optimize payload sizes

---

**This architecture is scalable and maintainable for the brainboxX marketplace!** ✨
