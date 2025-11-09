# Silya's Parfumerie - Project Structure Documentation

## 📁 New Folder Structure

This document explains the improved organization of the Silya's Parfumerie project, implemented on **November 9, 2024**.

---

## 🎯 Overview

The project has been restructured to follow modern web development best practices with:
- **Modular CSS** organization (components & pages)
- **Modular JavaScript** architecture (core, components, services)
- **Centralized data** management
- **Comprehensive configuration** files
- **Scalable structure** for future growth

---

## 📂 Complete Directory Structure

```
silya-parfumerie/
├── index.html                      # Homepage/Storefront
├── product-details.html            # Product details page
├── my-orders.html                  # Order tracking page
├── checkout.html                   # ✨ NEW - Checkout page
├── about.html                      # ✨ NEW - About us page
├── contact.html                    # ✨ NEW - Contact page
│
├── admin/
│   ├── login.html                  # Admin authentication
│   └── admin-panel.html            # Admin dashboard
│
├── assets/
│   ├── css/
│   │   ├── styles.css              # Main stylesheet
│   │   ├── responsive.css          # Media queries
│   │   ├── product-details.css     # Product page styles
│   │   ├── admin-styles.css        # Admin panel styles
│   │   ├── components/             # ✨ NEW - Component styles
│   │   │   ├── header.css          # Header component
│   │   │   ├── footer.css          # Footer component
│   │   │   ├── product-card.css    # Product card component
│   │   │   └── modals.css          # Modal dialogs
│   │   └── pages/                  # ✨ NEW - Page-specific styles
│   │       ├── home.css            # Homepage styles
│   │       ├── product.css         # Product page styles
│   │       └── checkout.css        # Checkout page styles
│   │
│   ├── js/
│   │   ├── script.js               # Main application logic
│   │   ├── translations.js         # Multi-language support
│   │   ├── data.js                 # Data loading
│   │   ├── product-details.js      # Product page logic
│   │   ├── my-orders.js            # Order tracking logic
│   │   ├── admin-login.js          # Admin authentication
│   │   ├── admin-panel.js          # Admin CRUD operations
│   │   ├── admin-enhanced.js       # Enhanced admin features
│   │   ├── import-export.js        # Data import/export
│   │   ├── core/                   # ✨ NEW - Core modules
│   │   │   ├── app.js              # (To be created) Main initialization
│   │   │   ├── router.js           # (To be created) SPA routing
│   │   │   └── utils.js            # (To be created) Helper functions
│   │   ├── components/             # ✨ NEW - Component modules
│   │   │   ├── cart.js             # (To be created) Cart functionality
│   │   │   ├── wishlist.js         # (To be created) Wishlist functionality
│   │   │   ├── search.js           # (To be created) Search functionality
│   │   │   └── filters.js          # (To be created) Filter functionality
│   │   ├── services/               # ✨ NEW - Service modules
│   │   │   ├── api.js              # ✅ API/Data fetching service
│   │   │   ├── storage.js          # ✅ LocalStorage wrapper service
│   │   │   └── analytics.js        # ✅ Analytics tracking service
│   │   └── vendor/                 # ✨ NEW - Third-party libraries
│   │
│   ├── data/
│   │   ├── products.json           # Product database
│   │   ├── categories.json         # Category definitions
│   │   ├── orders.json             # ✨ NEW - Sample orders
│   │   ├── customers.json          # ✨ NEW - Customer data
│   │   └── settings.json           # ✨ NEW - Site settings
│   │
│   └── images/
│       ├── logo/                   # Logo files
│       ├── products/               # Product images
│       │   ├── thumbnails/         # ✨ NEW - Small images (200x200)
│       │   ├── medium/             # ✨ NEW - Medium images (600x600)
│       │   └── large/              # ✨ NEW - Large images (1200x1200)
│       ├── categories/             # Category images
│       ├── hero/                   # Hero slider images
│       ├── brands/                 # Brand logos
│       ├── instagram/              # Instagram feed images
│       ├── about/                  # About page images
│       └── ui/                     # ✨ NEW - UI elements/icons
│
├── config/
│   ├── site-config.js              # Site configuration
│   ├── whatsapp-config.js          # WhatsApp integration
│   └── payment-config.js           # ✨ NEW - Payment gateway config
│
├── Documentation/
│   └── README.md                   # Main documentation
│
└── STRUCTURE.md                    # ✨ NEW - This file
```

---

## 🎨 CSS Organization

### Component-Based Architecture

The CSS is now organized into reusable components and page-specific styles:

#### **Components** (`assets/css/components/`)
Reusable UI components that appear across multiple pages:

| File | Purpose | Used On |
|------|---------|---------|
| `header.css` | Main header, navigation, search bar | All pages |
| `footer.css` | Footer, links, social media | All pages |
| `product-card.css` | Product display cards | Index, search, category pages |
| `modals.css` | Modal dialogs, sidebars | All pages with popups |

#### **Pages** (`assets/css/pages/`)
Page-specific styles that should only load on their respective pages:

| File | Purpose | Import On |
|------|---------|-----------|
| `home.css` | Hero slider, features bar, sections | `index.html` |
| `product.css` | Gallery, reviews, related products | `product-details.html` |
| `checkout.css` | Checkout form, order summary | `checkout.html` |

### Usage Example

```html
<!-- In checkout.html -->
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="assets/css/components/header.css">
<link rel="stylesheet" href="assets/css/components/footer.css">
<link rel="stylesheet" href="assets/css/pages/checkout.css">
<link rel="stylesheet" href="assets/css/responsive.css">
```

---

## ⚙️ JavaScript Organization

### Modular Architecture

The JavaScript is organized into three main categories:

#### **1. Services** (`assets/js/services/`)
Business logic and data management:

##### **`api.js`** - Data Fetching Service
```javascript
// Fetch all products
const products = await API.getProducts();

// Fetch filtered products
const perfumes = await API.getProducts({ category: 'parfums' });

// Search products
const results = await API.searchProducts('Chanel');

// Get single product
const product = await API.getProductById('1');
```

**Features:**
- ✅ Centralized data fetching
- ✅ Built-in caching (1 hour TTL)
- ✅ Search functionality
- ✅ Sorting & filtering
- ✅ Error handling

##### **`storage.js`** - LocalStorage Management
```javascript
// Cart operations
Storage.cart.add(product, quantity);
Storage.cart.remove(productId);
Storage.cart.update(productId, newQuantity);
const total = Storage.cart.getTotal();
const count = Storage.cart.getCount();

// Wishlist operations
Storage.wishlist.add(product);
Storage.wishlist.toggle(product);
const hasProduct = Storage.wishlist.has(productId);

// Recent views
Storage.recentViews.add(product);

// Search history
Storage.searchHistory.add(query);
```

**Features:**
- ✅ Automatic JSON serialization
- ✅ Expiration support
- ✅ Dedicated cart/wishlist APIs
- ✅ Recent views tracking
- ✅ Search history

##### **`analytics.js`** - Event Tracking
```javascript
// Initialize (call once on page load)
Analytics.init();

// Track events
Analytics.trackProductView(product);
Analytics.trackAddToCart(product, quantity);
Analytics.trackSearch(query, resultsCount);
Analytics.trackPurchase(order);

// Get analytics report
const report = Analytics.getReport();
console.log(report.totalEvents);
console.log(report.mostViewedProducts);
```

**Features:**
- ✅ Google Analytics integration (GA4)
- ✅ Facebook Pixel integration
- ✅ Local analytics storage
- ✅ E-commerce tracking
- ✅ Custom event tracking

#### **2. Core** (`assets/js/core/`)
Planned future modules:
- `app.js` - Application initialization and lifecycle
- `router.js` - Client-side routing (SPA)
- `utils.js` - Helper functions and utilities

#### **3. Components** (`assets/js/components/`)
Planned future modules:
- `cart.js` - Cart UI and logic
- `wishlist.js` - Wishlist UI and logic
- `search.js` - Search interface
- `filters.js` - Product filtering

---

## 📊 Data Files

### New Data Structure

#### **`orders.json`**
Sample order structure for testing:
```json
{
  "id": "ORD-20241109001",
  "orderNumber": "ORD-20241109001",
  "date": "2024-11-09T10:30:00Z",
  "status": "delivered",
  "customer": {...},
  "items": [...],
  "payment": {...},
  "shipping": {...},
  "totals": {...},
  "tracking": {...}
}
```

#### **`customers.json`**
Customer data structure:
```json
{
  "id": "CUST-001",
  "name": "Fatima El Amrani",
  "email": "fatima@example.com",
  "phone": "+212 6XX XXX XXX",
  "addresses": [...],
  "orders": ["ORD-001", "ORD-002"],
  "wishlist": ["1", "5", "12"],
  "loyaltyPoints": 850,
  "preferences": {...}
}
```

#### **`settings.json`**
Centralized site configuration:
```json
{
  "site": {...},
  "business": {...},
  "ecommerce": {
    "currency": {...},
    "shipping": {...},
    "payment": {...}
  },
  "features": {...},
  "theme": {...},
  "seo": {...}
}
```

---

## 💳 Payment Configuration

### `config/payment-config.js`

Centralized payment gateway configuration:

```javascript
// Get available payment methods for amount
const methods = getAvailablePaymentMethods(500);

// Validate coupon code
const result = validateCoupon('WELCOME10', 300);

// Calculate discount
const discount = calculateDiscount(coupon, orderAmount, shippingFee);

// Format price
const formatted = formatPrice(1250); // "1250.00 DH"
```

**Features:**
- ✅ Multiple payment methods (COD, Bank Transfer, Card, PayPal)
- ✅ Coupon/discount system
- ✅ CMI payment gateway integration (Morocco)
- ✅ Tax and refund settings
- ✅ Multi-currency support

**Supported Payment Methods:**
1. **Cash on Delivery (COD)** - 50-5,000 DH
2. **Bank Transfer** - 200-50,000 DH
3. **Credit/Debit Card** - 50-50,000 DH (Visa, Mastercard)
4. **PayPal** - Disabled by default

**Sample Coupon Codes:**
- `WELCOME10` - 10% discount (min 200 DH)
- `SAVE50` - 50 DH off (min 300 DH)
- `FREESHIP` - Free shipping (min 200 DH)

---

## 🖼️ Image Organization

### Size Guidelines

Organize product images into three sizes for optimal performance:

| Folder | Size | Usage |
|--------|------|-------|
| `thumbnails/` | 200x200px | Product grids, cart items |
| `medium/` | 600x600px | Product page main image |
| `large/` | 1200x1200px | Zoom functionality, high-res displays |

**Example:**
```
products/
├── thumbnails/
│   └── chanel-no5-thumb.jpg    (200x200px, ~20KB)
├── medium/
│   └── chanel-no5-medium.jpg   (600x600px, ~80KB)
└── large/
    └── chanel-no5-large.jpg    (1200x1200px, ~200KB)
```

**Benefits:**
- ⚡ Faster page load times
- 📱 Better mobile performance
- 💾 Reduced bandwidth usage
- 🎯 Responsive images

---

## 🚀 Migration Guide

### Gradual Refactoring Approach

The new structure is designed to work **alongside** existing code. You can migrate gradually:

### Phase 1: Start Using Services ✅ (Ready Now)

```javascript
// Instead of direct localStorage access:
localStorage.setItem('cart', JSON.stringify(cart));

// Use Storage service:
Storage.cart.set(cart);
```

```javascript
// Instead of direct fetch:
const response = await fetch('assets/data/products.json');
const products = await response.json();

// Use API service:
const products = await API.getProducts();
```

### Phase 2: Extract Components (Future)

Gradually move component-specific CSS from `styles.css` to component files:

1. Copy header styles from `styles.css` to `components/header.css`
2. Test the page
3. Remove from `styles.css`
4. Repeat for other components

### Phase 3: Modularize JavaScript (Future)

Extract functionality into component modules:

```javascript
// cart.js
export class Cart {
  constructor() {
    this.items = Storage.cart.get();
  }

  add(product, quantity) {
    // Cart logic here
  }
}
```

---

## 📝 Best Practices

### CSS

✅ **DO:**
- Use BEM naming: `.product-card__title--featured`
- Keep components small and focused
- Use CSS custom properties (variables)
- Make components reusable

❌ **DON'T:**
- Mix component and page styles
- Use overly specific selectors
- Duplicate styles across files

### JavaScript

✅ **DO:**
- Use async/await for data fetching
- Handle errors gracefully
- Use the Storage service for persistence
- Track events with Analytics service

❌ **DON'T:**
- Access localStorage directly (use Storage service)
- Duplicate API calls (use caching)
- Mix business logic with UI code

### File Organization

✅ **DO:**
- Keep related files together
- Follow the established folder structure
- Document new components/modules
- Use descriptive file names

❌ **DON'T:**
- Create files in root directory
- Mix different concerns in one file
- Leave orphaned/unused files

---

## 🔧 Development Workflow

### Adding a New Page

1. Create HTML file in root: `new-page.html`
2. Create page-specific CSS: `assets/css/pages/new-page.css`
3. Create page-specific JS if needed: `assets/js/new-page.js`
4. Import necessary components:
   ```html
   <link rel="stylesheet" href="assets/css/components/header.css">
   <link rel="stylesheet" href="assets/css/pages/new-page.css">
   ```

### Adding a New Component

1. Create CSS file: `assets/css/components/component-name.css`
2. Document the component with comments
3. Create JS if interactive: `assets/js/components/component-name.js`
4. Import where needed

### Adding a New Feature

1. Plan data structure (add to `settings.json` if config)
2. Create service if needed (`assets/js/services/`)
3. Create component styles/logic
4. Test thoroughly
5. Document in this file

---

## 📚 Additional Resources

### Configuration Files

| File | Purpose |
|------|---------|
| `config/site-config.js` | Site-wide settings, business info, features |
| `config/whatsapp-config.js` | WhatsApp integration, message templates |
| `config/payment-config.js` | Payment methods, gateways, coupons |

### Data Files

| File | Purpose |
|------|---------|
| `assets/data/products.json` | Product catalog (26+ items) |
| `assets/data/categories.json` | Categories (6 categories) |
| `assets/data/orders.json` | Sample order data |
| `assets/data/customers.json` | Customer profiles |
| `assets/data/settings.json` | Centralized settings |

---

## 🎯 Next Steps

### Immediate (Week 1-2)
- [ ] Start using `API` service for data fetching
- [ ] Migrate localStorage calls to `Storage` service
- [ ] Initialize `Analytics` service
- [ ] Add images to new size folders

### Short-term (Month 1)
- [ ] Extract CSS components from `styles.css`
- [ ] Create cart component module
- [ ] Create wishlist component module
- [ ] Implement proper image sizing

### Long-term (Month 2-3)
- [ ] Full CSS modularization
- [ ] Complete JavaScript refactoring
- [ ] Implement SPA routing
- [ ] Add backend API integration

---

## 🆘 Troubleshooting

### Issue: Services not working

**Solution:** Ensure scripts are loaded in correct order:
```html
<script src="assets/js/services/storage.js"></script>
<script src="assets/js/services/api.js"></script>
<script src="assets/js/services/analytics.js"></script>
<script src="assets/js/script.js"></script> <!-- Your code last -->
```

### Issue: Styles not applying

**Solution:** Check import order:
```html
<link rel="stylesheet" href="assets/css/styles.css"> <!-- Base first -->
<link rel="stylesheet" href="assets/css/components/header.css"> <!-- Components -->
<link rel="stylesheet" href="assets/css/pages/home.css"> <!-- Page-specific -->
<link rel="stylesheet" href="assets/css/responsive.css"> <!-- Responsive last -->
```

### Issue: Images not loading

**Solution:** Ensure images exist in all size folders and update paths:
```javascript
// Use medium size for product cards
<img src="assets/images/products/medium/product-name.jpg">

// Use thumbnails for cart
<img src="assets/images/products/thumbnails/product-name.jpg">
```

---

## 📞 Support

For questions about this structure:
1. Read the main `Documentation/README.md`
2. Check `config/site-config.js` for configuration
3. Review the source code comments
4. Consult this `STRUCTURE.md` file

---

**Last Updated:** November 9, 2024
**Version:** 2.0.0
**Author:** Silya's Parfumerie Development Team
