# 🌸 Silya's Parfumerie - E-commerce Website

> A modern, responsive e-commerce website for beauty and cosmetics products in Kénitra, Morocco.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Silya's Parfumerie is a fully-featured e-commerce website designed for a beauty and cosmetics store in Kénitra, Morocco. The website offers a seamless shopping experience with multi-language support, dark mode, WhatsApp integration, and a complete admin panel for product management.

### 🌟 Key Highlights

- **100% Responsive** - Works perfectly on all devices
- **Multi-language** - French, English, and Arabic support
- **Dark Mode** - User-friendly theme switcher
- **WhatsApp Integration** - Direct order placement via WhatsApp
- **Admin Panel** - Complete product and category management
- **Modern UI** - Clean, elegant design with smooth animations

---

## ✨ Features

### Customer-Facing Features

- 🎨 **Hero Slider** - Engaging homepage with promotional slides
- 🏷️ **Category Browsing** - Easy navigation through product categories
- 🔍 **Product Search** - Fast and accurate product search
- 🛒 **Shopping Cart** - Add products, manage quantities, and checkout
- ❤️ **Wishlist** - Save favorite products for later
- ⚡ **Quick View** - Preview product details in a modal
- 🌐 **Multi-language** - Support for FR, EN, and AR
- 🌙 **Dark/Light Mode** - Theme toggle for user preference
- 📱 **WhatsApp Orders** - Direct checkout via WhatsApp
- 📸 **Instagram Feed** - Showcase social media presence
- ⭐ **Product Ratings** - Display customer reviews and ratings
- 🎁 **Gift Sets** - Special category for gift packages
- 🚚 **Free Shipping** - Promotional banners for delivery

### Admin Features

- 🔐 **Secure Login** - Authentication system for admin access
- 📊 **Dashboard** - Overview of store statistics
- 📦 **Product Management** - Full CRUD operations for products
- 🏷️ **Category Management** - Manage product categories
- 📈 **Activity Log** - Track recent changes and activities
- 💾 **Auto-save** - Automatic data persistence
- 📱 **Responsive Admin** - Mobile-friendly admin panel

---

## 📁 Project Structure

```
silya-parfumerie/
│
├── 📄 index.html                 # Main storefront page
│
├── 📁 admin/
│   ├── login.html               # Admin login page
│   └── admin-panel.html         # Admin dashboard
│
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── styles.css          # Main stylesheet
│   │   ├── responsive.css      # Responsive styles
│   │   └── admin-styles.css    # Admin panel styles
│   │
│   ├── 📁 js/
│   │   ├── script.js           # Main frontend logic
│   │   ├── translations.js     # Multi-language system
│   │   ├── admin-login.js      # Admin authentication
│   │   └── admin-panel.js      # Admin functionality
│   │
│   ├── 📁 images/
│   │   ├── logo/               # Brand logos
│   │   ├── hero/               # Hero slider images
│   │   ├── categories/         # Category images
│   │   ├── products/           # Product images
│   │   ├── brands/             # Brand logos
│   │   ├── instagram/          # Instagram feed
│   │   └── about/              # About section images
│   │
│   └── 📁 data/
│       ├── products.json       # Product database
│       └── categories.json     # Category structure
│
├── 📁 config/
│   ├── site-config.js          # Site configuration
│   └── whatsapp-config.js      # WhatsApp settings
│
└── 📁 Documentation/
    └── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)
- Text editor or IDE (VS Code, Sublime Text, etc.)

### Step 1: Clone or Download

```bash
# Clone the repository (if using Git)
git clone https://github.com/yourusername/silya-parfumerie.git

# Or download the ZIP file and extract it
```

### Step 2: Open in Browser

#### Option A: Direct File Opening (Simple)
```bash
# Navigate to the project directory
cd silya-parfumerie

# Open index.html in your browser
# On macOS: open index.html
# On Linux: xdg-open index.html
# On Windows: start index.html
```

#### Option B: Using a Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Step 3: Access the Website

Open your browser and navigate to:
- **Main Site:** `http://localhost:8000/index.html`
- **Admin Panel:** `http://localhost:8000/admin/login.html`

---

## 💻 Usage

### For Customers

1. **Browse Products**
   - Navigate through categories
   - Use the search bar to find specific products
   - Filter by "New", "Bestseller", or "Sale"

2. **Add to Cart**
   - Click "Ajouter au panier" on any product
   - Adjust quantities in the cart sidebar
   - Remove items if needed

3. **Wishlist**
   - Click the heart icon on products
   - View wishlist by clicking the heart icon in header
   - Move items from wishlist to cart

4. **Place Order**
   - Click "Commander via WhatsApp" in cart
   - Complete order details in WhatsApp
   - Send to place order

5. **Change Language**
   - Click FR/EN/AR buttons in top bar
   - Website updates instantly

6. **Toggle Theme**
   - Click moon/sun icon in top bar
   - Switch between light and dark modes

### For Administrators

1. **Login**
   - Navigate to `/admin/login.html`
   - **Default credentials:**
     - Username: `admin`
     - Password: `silya2024`
   - ⚠️ **Change these in production!**

2. **Manage Products**
   - View all products in the Products section
   - Add new products with the "+ Ajouter" button
   - Edit existing products
   - Delete products (with confirmation)

3. **View Dashboard**
   - See total products count
   - View popular products
   - Check recent activity

4. **Manage Categories**
   - View all categories
   - See product count per category

---

## 🔐 Admin Panel

### Access

- **URL:** `/admin/login.html`
- **Default Username:** `admin`
- **Default Password:** `silya2024`

### Features

#### Dashboard
- Overview statistics
- Total products count
- Popular products list
- Recent activity log

#### Product Management
- Add new products
- Edit existing products
- Delete products
- View product details
- Filter and search products

#### Product Fields
- Name (FR/EN/AR)
- Brand
- Category
- Price
- Original Price (for discounts)
- Description
- Volume/Size
- Rating
- Image URL
- In Stock status
- Badge (New/Bestseller/Sale)

### Security Features

- Session management
- Auto-logout
- Rate limiting (5 attempts max)
- 5-minute lockout after max attempts
- Remember me option (7 days)
- Session timeout

---

## ⚙️ Configuration

### Site Configuration (`config/site-config.js`)

```javascript
const siteConfig = {
    siteName: 'Silya\'s Parfumerie',
    contact: {
        phone: '+212 766 985 350',
        email: 'contact@silyasparfumerie.ma',
        address: {
            street: 'Kénitra Mall, 1er étage',
            unit: 'Magasin n°82',
            city: 'Kénitra'
        }
    },
    shipping: {
        freeShippingThreshold: 500,
        standardShippingFee: 30
    }
};
```

### WhatsApp Configuration (`config/whatsapp-config.js`)

```javascript
const whatsappConfig = {
    phoneNumber: '212766985350',
    businessName: 'Silya\'s Parfumerie',
    greetingMessage: '👋 Bonjour! Bienvenue...'
};
```

### Product Data (`assets/data/products.json`)

```json
{
    "id": 1,
    "name": "Product Name",
    "category": "parfums",
    "price": 1200,
    "originalPrice": 1500,
    "image": "products/product.jpg",
    "rating": 4.8,
    "reviews": 245,
    "badge": "bestseller",
    "inStock": true
}
```

---

## 🛠️ Development

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome** - Icon library
- **Google Fonts** - Playfair Display & Poppins

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 575px)

/* Small Tablet */
@media (min-width: 576px)

/* Tablet */
@media (min-width: 768px)

/* Desktop */
@media (min-width: 992px)

/* Large Desktop */
@media (min-width: 1200px)

/* Extra Large */
@media (min-width: 1400px)
```

### Adding New Products

1. **Manual Method:**
   - Login to admin panel
   - Go to Products section
   - Click "+ Ajouter un produit"
   - Fill in product details
   - Save

2. **JSON Method:**
   - Edit `assets/data/products.json`
   - Add new product object:
   ```json
   {
       "id": 27,
       "name": "New Product",
       "category": "parfums",
       "price": 500,
       "image": "products/new-product.jpg",
       "rating": 4.5,
       "reviews": 0,
       "inStock": true
   }
   ```

### Adding New Categories

Edit `assets/data/categories.json`:
```json
{
    "id": "new-category",
    "name": "Nouvelle Catégorie",
    "nameEn": "New Category",
    "nameAr": "فئة جديدة",
    "icon": "fa-icon-name",
    "image": "categories/category.jpg"
}
```

### Customizing Colors

Edit CSS variables in `assets/css/styles.css`:
```css
:root {
    --gold-primary: #C8A882;
    --gold-dark: #A08968;
    --gold-light: #E5D4B7;
}
```

---

## 🚀 Deployment

### Deployment Options

#### 1. **Static Hosting (Recommended)**

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
1. Push code to GitHub
2. Go to Settings > Pages
3. Select branch and folder
4. Save

#### 2. **Traditional Web Hosting**

1. Export all files
2. Upload to hosting via FTP/SFTP
3. Ensure proper file permissions
4. Point domain to hosting

### Pre-Deployment Checklist

- [ ] Change admin password in `admin-login.js`
- [ ] Update contact information in config files
- [ ] Add real product images
- [ ] Test all features
- [ ] Enable HTTPS
- [ ] Set up analytics (optional)
- [ ] Configure email notifications
- [ ] Test WhatsApp integration
- [ ] Verify responsive design
- [ ] Test multi-language switching
- [ ] Optimize images
- [ ] Minify CSS/JS (optional)

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Images not loading
- **Solution:** Check image paths in JSON files
- Ensure images exist in `assets/images/` directory

**Issue:** WhatsApp button not working
- **Solution:** Verify phone number in `config/whatsapp-config.js`
- Check format: no + or spaces (e.g., "212766985350")

**Issue:** Admin login not working
- **Solution:** Check credentials in `admin-login.js`
- Clear browser cache and localStorage

**Issue:** Language switching not working
- **Solution:** Ensure `translations.js` is loaded
- Check browser console for errors

**Issue:** Cart not persisting
- **Solution:** Enable localStorage in browser
- Check browser privacy settings

---

## 📝 Best Practices

### For Developers

1. **Code Organization**
   - Keep related code together
   - Use meaningful variable names
   - Comment complex logic

2. **Performance**
   - Optimize images (WebP format)
   - Minimize HTTP requests
   - Use lazy loading for images

3. **Security**
   - Change default admin credentials
   - Implement server-side authentication (production)
   - Sanitize user inputs
   - Use HTTPS

4. **Maintenance**
   - Regular backups
   - Keep dependencies updated
   - Monitor error logs
   - Test after each change

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support, contact:
- **Email:** contact@silyasparfumerie.ma
- **Phone:** +212 766 985 350
- **WhatsApp:** [Message us](https://wa.me/212766985350)
- **Instagram:** [@silya_parfumerie](https://instagram.com/silya_parfumerie)

---

## 🎯 Roadmap

### Current Version (v1.0.0)
- ✅ Main website with product catalog
- ✅ Shopping cart and wishlist
- ✅ Multi-language support
- ✅ WhatsApp integration
- ✅ Admin panel

### Future Enhancements (v2.0.0)
- 🔄 Backend API integration
- 🔄 User accounts and authentication
- 🔄 Order tracking system
- 🔄 Payment gateway integration
- 🔄 Email notifications
- 🔄 Product reviews and ratings
- 🔄 Advanced analytics
- 🔄 Loyalty program
- 🔄 Blog section
- 🔄 Live chat support

---

## 🙏 Acknowledgments

- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Unsplash/Pexels** - Stock images (if used)
- **Community** - Open source contributors

---

## 📊 Project Stats

- **Lines of Code:** ~5,000+
- **Files:** 20+
- **Languages:** HTML, CSS, JavaScript
- **Supported Languages:** French, English, Arabic
- **Responsive Breakpoints:** 6
- **Product Categories:** 6
- **Sample Products:** 26

---

**Made with ❤️ for Silya's Parfumerie**

*Last Updated: November 2024*
