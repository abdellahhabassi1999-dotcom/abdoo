/* ====================================
   Silya's Parfumerie - Main JavaScript
   ==================================== */

// ==================== Global State ====================
let products = [];
let categories = [];
let cart = JSON.parse(localStorage.getItem('silya-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('silya-wishlist')) || [];
let currentFilter = 'all';
let displayedProducts = 12;
const productsPerPage = 12;

// ==================== Initialize App ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeSlider();
    loadData();
    attachEventListeners();
    updateCartCount();
    updateWishlistCount();
});

// ==================== Theme Management ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('silya-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('silya-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ==================== Hero Slider ====================
let currentSlide = 0;
let sliderInterval;

function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Start auto-play
    startSliderAutoPlay();

    // Previous button
    const prevBtn = document.querySelector('.slider-control.prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            changeSlide(-1);
            resetSliderAutoPlay();
        });
    }

    // Next button
    const nextBtn = document.querySelector('.slider-control.next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            changeSlide(1);
            resetSliderAutoPlay();
        });
    }

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetSliderAutoPlay();
        });
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function startSliderAutoPlay() {
    sliderInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function resetSliderAutoPlay() {
    clearInterval(sliderInterval);
    startSliderAutoPlay();
}

// ==================== Data Loading ====================
async function loadData() {
    showLoadingState(true);

    try {
        // Try to load from JSON files (works with web server)
        const productsResponse = await fetch('assets/data/products.json');
        const categoriesResponse = await fetch('assets/data/categories.json');

        if (productsResponse.ok && categoriesResponse.ok) {
            products = await productsResponse.json();
            categories = await categoriesResponse.json();
            console.log('Data loaded from JSON files successfully');
        } else {
            throw new Error('Failed to load JSON files');
        }
    } catch (error) {
        console.warn('Loading from JSON failed, using sample data:', error.message);
        // Use sample data if files don't exist or CORS blocks access
        loadSampleData();
    } finally {
        showLoadingState(false);
        renderCategories();
        renderProducts();
    }
}

// Show/hide loading state
function showLoadingState(show) {
    const productsGrid = document.getElementById('productsGrid');
    const categoriesGrid = document.getElementById('categoriesGrid');

    if (show) {
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <div style="display: inline-block; width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid var(--gold-primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="margin-top: 20px; color: var(--text-secondary);">Chargement des produits...</p>
                </div>
            `;
        }
    }
}

function loadSampleData() {
    // Sample categories
    categories = [
        { id: 'gifts', name: 'Coffrets Cadeaux', nameEn: 'Gift Sets', nameAr: 'صناديق الهدايا', icon: 'fa-gift', image: 'categories/gifts.jpg' },
        { id: 'parfums', name: 'Parfums', nameEn: 'Perfumes', nameAr: 'العطور', icon: 'fa-spray-can', image: 'categories/parfums.jpg' },
        { id: 'skincare', name: 'Soins de la Peau', nameEn: 'Skincare', nameAr: 'العناية بالبشرة', icon: 'fa-hand-sparkles', image: 'categories/skincare.jpg' },
        { id: 'haircare', name: 'Soins Capillaires', nameEn: 'Hair Care', nameAr: 'العناية بالشعر', icon: 'fa-spray-can-sparkles', image: 'categories/haircare.jpg' },
        { id: 'hygiene', name: 'Hygiène', nameEn: 'Hygiene', nameAr: 'النظافة', icon: 'fa-pump-soap', image: 'categories/hygiene.jpg' },
        { id: 'makeup', name: 'Maquillage', nameEn: 'Makeup', nameAr: 'المكياج', icon: 'fa-palette', image: 'categories/makeup.jpg' }
    ];

    // Sample products
    products = [
        {
            id: 1,
            name: 'Dior Sauvage Eau de Parfum',
            nameEn: 'Dior Sauvage Eau de Parfum',
            nameAr: 'ديور سوفاج او دو بارفان',
            category: 'parfums',
            price: 1200,
            originalPrice: 1500,
            image: 'products/dior-sauvage.jpg',
            rating: 4.8,
            reviews: 245,
            badge: 'bestseller',
            inStock: true,
            description: 'Un parfum masculin puissant et raffiné'
        },
        {
            id: 2,
            name: 'Chanel N°5 Eau de Parfum',
            nameEn: 'Chanel N°5 Eau de Parfum',
            nameAr: 'شانيل رقم 5 او دو بارفان',
            category: 'parfums',
            price: 1800,
            image: 'products/chanel-5.jpg',
            rating: 4.9,
            reviews: 589,
            badge: 'bestseller',
            inStock: true,
            description: 'Le parfum iconique féminin'
        },
        {
            id: 3,
            name: 'La Roche-Posay Effaclar Duo',
            nameEn: 'La Roche-Posay Effaclar Duo',
            nameAr: 'لاروش بوزيه إيفاكلار ديو',
            category: 'skincare',
            price: 280,
            image: 'products/effaclar.jpg',
            rating: 4.6,
            reviews: 178,
            badge: 'new',
            inStock: true,
            description: 'Soin anti-imperfections'
        },
        {
            id: 4,
            name: 'Lancôme Hypnôse Mascara',
            nameEn: 'Lancôme Hypnôse Mascara',
            nameAr: 'لانكوم هيبنوز ماسكارا',
            category: 'makeup',
            price: 320,
            originalPrice: 400,
            image: 'products/hypnose.jpg',
            rating: 4.7,
            reviews: 312,
            badge: 'sale',
            inStock: true,
            description: 'Mascara volume spectaculaire'
        },
        {
            id: 5,
            name: 'Kérastase Résistance Bain',
            nameEn: 'Kérastase Résistance Bain',
            nameAr: 'كيراستاس ريزيستانس بان',
            category: 'haircare',
            price: 450,
            image: 'products/kerastase.jpg',
            rating: 4.5,
            reviews: 95,
            inStock: true,
            description: 'Shampooing fortifiant'
        },
        {
            id: 6,
            name: 'Coffret Yves Saint Laurent',
            nameEn: 'Yves Saint Laurent Gift Set',
            nameAr: 'طقم هدية إيف سان لوران',
            category: 'gifts',
            price: 1600,
            image: 'products/ysl-set.jpg',
            rating: 4.9,
            reviews: 67,
            badge: 'new',
            inStock: true,
            description: 'Coffret luxe 3 pièces'
        }
    ];

    renderCategories();
    renderProducts();
}

// ==================== Render Categories ====================
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card" data-category="${category.id}">
            <img src="assets/images/${category.image}" alt="${category.name}" loading="lazy" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="category-overlay">
                <h3>${category.name}</h3>
                <p><i class="fas ${category.icon}"></i></p>
            </div>
        </div>
    `).join('');

    // Add click listeners to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const categoryId = card.getAttribute('data-category');
            filterProductsByCategory(categoryId);

            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ==================== Render Products ====================
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    let filteredProducts = products;

    // Apply filters
    if (filter === 'new') {
        filteredProducts = products.filter(p => p.badge === 'new');
    } else if (filter === 'bestseller') {
        filteredProducts = products.filter(p => p.badge === 'bestseller');
    } else if (filter === 'sale') {
        filteredProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);
    } else if (filter !== 'all') {
        // Category filter
        filteredProducts = products.filter(p => p.category === filter);
    }

    // Limit displayed products
    const displayProducts = filteredProducts.slice(0, displayedProducts);

    productsGrid.innerHTML = displayProducts.map(product => {
        const isInCart = cart.some(item => item.id === product.id);
        const isInWishlist = wishlist.some(item => item.id === product.id);
        const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="assets/images/${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/placeholder.jpg'">
                    ${product.badge ? `<div class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
                    ${discount > 0 ? `<div class="product-badge badge-sale">-${discount}%</div>` : ''}
                    <div class="product-actions">
                        <button class="product-action-btn quick-view-btn" data-product-id="${product.id}" title="Aperçu rapide">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="product-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}" title="Ajouter à la liste de souhaits">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${getCategoryName(product.category)}</div>
                    <h3 class="product-name" onclick="window.location.href='product-details.html?id=${product.id}'" style="cursor: pointer;">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} DH</span>
                        ${product.originalPrice ? `<span class="original-price">${product.originalPrice} DH</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="stars">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i> ${isInCart ? 'Déjà dans le panier' : 'Ajouter au panier'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (displayedProducts >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Attach product event listeners
    attachProductEventListeners();
}

function getBadgeText(badge) {
    const badges = {
        new: 'Nouveau',
        bestseller: 'Best Seller',
        sale: 'Promo'
    };
    return badges[badge] || '';
}

function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// ==================== Product Filters ====================
function filterProductsByCategory(categoryId) {
    currentFilter = categoryId;
    displayedProducts = productsPerPage;

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    renderProducts(categoryId);
}

// ==================== Cart Management ====================
function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    renderCartItems();
    showNotification(translationManager?.translate('added-to-cart') || 'Produit ajouté au panier');
    renderProducts(currentFilter);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== parseInt(productId));
    saveCart();
    updateCartCount();
    renderCartItems();
    showNotification(translationManager?.translate('removed-from-cart') || 'Produit retiré du panier');
    renderProducts(currentFilter);
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === parseInt(productId));
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        renderCartItems();
    }
}

function saveCart() {
    localStorage.setItem('silya-cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <p>${translationManager?.translate('cart-empty') || 'Votre panier est vide'}</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '0 DH';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="assets/images/${item.image}" alt="${item.name}" onerror="this.src='assets/images/placeholder.jpg'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} DH</div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = `${total.toFixed(2)} DH`;
    }
}

// ==================== Wishlist Management ====================
function addToWishlist(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const existingItem = wishlist.find(item => item.id === product.id);

    if (existingItem) {
        removeFromWishlist(productId);
        return;
    }

    wishlist.push(product);
    saveWishlist();
    updateWishlistCount();
    renderWishlistItems();
    showNotification(translationManager?.translate('added-to-wishlist') || 'Produit ajouté à la liste de souhaits');
    renderProducts(currentFilter);
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== parseInt(productId));
    saveWishlist();
    updateWishlistCount();
    renderWishlistItems();
    showNotification(translationManager?.translate('removed-from-wishlist') || 'Produit retiré de la liste de souhaits');
    renderProducts(currentFilter);
}

function saveWishlist() {
    localStorage.setItem('silya-wishlist', JSON.stringify(wishlist));
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

function renderWishlistItems() {
    const wishlistItems = document.getElementById('wishlistItems');
    if (!wishlistItems) return;

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-state">
                <i class="far fa-heart"></i>
                <p>${translationManager?.translate('wishlist-empty') || 'Votre liste de souhaits est vide'}</p>
            </div>
        `;
        return;
    }

    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <div class="wishlist-item-image">
                <img src="assets/images/${item.image}" alt="${item.name}" onerror="this.src='assets/images/placeholder.jpg'">
            </div>
            <div class="wishlist-item-info">
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">${item.price} DH</div>
                <div class="cart-item-controls">
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id}); removeFromWishlist(${item.id});">
                        <i class="fas fa-shopping-bag"></i> ${translationManager?.translate('move-to-cart') || 'Ajouter au panier'}
                    </button>
                    <button class="remove-item-btn" onclick="removeFromWishlist(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== WhatsApp Integration ====================
function checkoutViaWhatsApp() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide');
        return;
    }

    const phoneNumber = '212766985350'; // WhatsApp number
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}

function generateWhatsAppMessage() {
    let message = '🛍️ *Nouvelle Commande - Silya\'s Parfumerie*\n';
    message += '━━━━━━━━━━━━━━━━━━━━\n\n';

    cart.forEach(item => {
        message += `📦 *${item.name}*\n`;
        message += `   Quantité: ${item.quantity}\n`;
        message += `   Prix unitaire: ${item.price} DH\n`;
        message += `   Sous-total: ${item.price * item.quantity} DH\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += '━━━━━━━━━━━━━━━━━━━━\n';
    message += `💰 *Total: ${total.toFixed(2)} DH*\n\n`;
    message += '📍 Adresse de livraison: [À compléter]\n';
    message += '📞 Téléphone: [À compléter]\n\n';
    message += 'Merci pour votre commande! 🌸';

    return message;
}

// ==================== Quick View Modal ====================
function showQuickView(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const quickViewContent = document.getElementById('quickViewContent');

    if (!modal || !quickViewContent) return;

    const isInCart = cart.some(item => item.id === product.id);
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

    quickViewContent.innerHTML = `
        <div class="quick-view-image">
            <img src="assets/images/${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
            ${product.badge ? `<div class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
        </div>
        <div class="quick-view-details">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h2>${product.name}</h2>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews} avis)</span>
            </div>
            <div class="product-price">
                <span class="current-price">${product.price} DH</span>
                ${product.originalPrice ? `<span class="original-price">${product.originalPrice} DH</span>` : ''}
                ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
            </div>
            <p class="product-description">${product.description || ''}</p>
            <div class="quick-view-actions">
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); closeModal();">
                    <i class="fas fa-shopping-bag"></i> ${isInCart ? 'Déjà dans le panier' : 'Ajouter au panier'}
                </button>
                <button class="btn btn-secondary btn-block" onclick="addToWishlist(${product.id}); closeModal();">
                    <i class="far fa-heart"></i> Ajouter à la liste de souhaits
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.getElementById('overlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== Search Functionality ====================
function performSearch(query) {
    if (!query || query.trim() === '') {
        renderProducts(currentFilter);
        return;
    }

    const searchQuery = query.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.nameEn?.toLowerCase().includes(searchQuery) ||
        product.nameAr?.includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery)
    );

    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <p>${translationManager?.translate('no-results') || 'Aucun résultat trouvé'}</p>
            </div>
        `;
        return;
    }

    // Temporarily override products array for rendering
    const originalProducts = [...products];
    products = filteredProducts;
    renderProducts('all');
    products = originalProducts;
}

// ==================== Notifications ====================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--gold-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== Event Listeners ====================
function attachEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.getElementById('overlay')?.classList.toggle('active');
        });
    }

    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.getElementById('searchBar');
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                document.getElementById('searchInput')?.focus();
            }
        });
    }

    // Search close
    const searchClose = document.querySelector('.search-close');
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchBar?.classList.remove('active');
        });
    }

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
    }

    // Cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            document.getElementById('overlay')?.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCartItems();
        });
    }

    // Cart close
    const cartClose = document.querySelector('.cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar?.classList.remove('active');
            document.getElementById('overlay')?.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Wishlist toggle
    const wishlistToggle = document.querySelector('.wishlist-toggle');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    if (wishlistToggle && wishlistSidebar) {
        wishlistToggle.addEventListener('click', () => {
            wishlistSidebar.classList.add('active');
            document.getElementById('overlay')?.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderWishlistItems();
        });
    }

    // Wishlist close
    const wishlistClose = document.querySelector('.wishlist-close');
    if (wishlistClose) {
        wishlistClose.addEventListener('click', () => {
            wishlistSidebar?.classList.remove('active');
            document.getElementById('overlay')?.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Overlay click
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            cartSidebar?.classList.remove('active');
            wishlistSidebar?.classList.remove('active');
            mainNav?.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
            overlay.classList.remove('active');
            closeModal();
            document.body.style.overflow = '';
        });
    }

    // Product filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            currentFilter = filter;
            displayedProducts = productsPerPage;
            renderProducts(filter);
        });
    });

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedProducts += productsPerPage;
            renderProducts(currentFilter);
        });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckout);
    }

    // Modal close
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                mainNav?.classList.remove('active');
                mobileMenuToggle?.classList.remove('active');
                overlay?.classList.remove('active');
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function attachProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-product-id');
            addToCart(productId);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-product-id');
            addToWishlist(productId);
        });
    });

    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-product-id');
            showQuickView(productId);
        });
    });
}

// ==================== Checkout System ====================
let currentCoupon = null;
const freeShippingThreshold = 500; // Free shipping above 500 DH
const shippingCost = 30; // 30 DH shipping cost

// Available coupons
const coupons = {
    'SILYA10': { type: 'percentage', value: 10, minOrder: 200 },
    'SILYA20': { type: 'percentage', value: 20, minOrder: 500 },
    'WELCOME': { type: 'fixed', value: 50, minOrder: 300 },
    'NEWYEAR': { type: 'percentage', value: 15, minOrder: 0 }
};

function openCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'warning');
        return;
    }

    const checkoutModal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');

    // Populate checkout summary
    updateCheckoutSummary();

    // Show modal
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close cart sidebar
    document.getElementById('cartSidebar')?.classList.remove('active');
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');

    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    // Reset coupon
    currentCoupon = null;
    document.getElementById('couponCode').value = '';
    document.getElementById('couponMessage').textContent = '';
    document.getElementById('discountRow').style.display = 'none';
}

function updateCheckoutSummary() {
    const summaryItems = document.getElementById('checkoutSummaryItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Render items
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="assets/images/${item.image}" alt="${item.name}" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-price">
                    ${item.price} DH × <span class="summary-item-quantity">${item.quantity}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Calculate totals
    let discount = 0;
    if (currentCoupon) {
        if (currentCoupon.type === 'percentage') {
            discount = subtotal * (currentCoupon.value / 100);
        } else {
            discount = currentCoupon.value;
        }
    }

    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
    const total = subtotal - discount + shipping;

    // Update UI
    document.getElementById('checkoutSubtotal').textContent = `${subtotal.toFixed(2)} DH`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Gratuite' : `${shipping} DH`;
    document.getElementById('checkoutTotal').textContent = `${total.toFixed(2)} DH`;

    // Show/hide discount row
    if (currentCoupon) {
        document.getElementById('discountRow').style.display = 'flex';
        document.getElementById('discountLabel').textContent = currentCoupon.code;
        document.getElementById('discountAmount').textContent = `-${discount.toFixed(2)} DH`;
    } else {
        document.getElementById('discountRow').style.display = 'none';
    }
}

function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.trim().toUpperCase();
    const couponMessage = document.getElementById('couponMessage');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!couponCode) {
        couponMessage.textContent = 'Veuillez entrer un code promo';
        couponMessage.className = 'coupon-message error';
        return;
    }

    const coupon = coupons[couponCode];

    if (!coupon) {
        couponMessage.textContent = 'Code promo invalide';
        couponMessage.className = 'coupon-message error';
        currentCoupon = null;
        updateCheckoutSummary();
        return;
    }

    if (subtotal < coupon.minOrder) {
        couponMessage.textContent = `Commande minimale de ${coupon.minOrder} DH requise`;
        couponMessage.className = 'coupon-message error';
        currentCoupon = null;
        updateCheckoutSummary();
        return;
    }

    currentCoupon = { ...coupon, code: couponCode };
    const discountValue = coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value} DH`;
    couponMessage.textContent = `✓ Code promo appliqué! Réduction de ${discountValue}`;
    couponMessage.className = 'coupon-message success';
    updateCheckoutSummary();
}

function submitOrder() {
    const form = document.getElementById('checkoutForm');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get form data
    const orderData = {
        id: 'ORD-' + Date.now().toString().slice(-6),
        date: new Date().toISOString(),
        customer: {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value || 'N/A',
            city: document.getElementById('customerCity').value,
            address: document.getElementById('customerAddress').value
        },
        products: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),
        paymentMethod: document.getElementById('paymentMethod').value,
        notes: document.getElementById('orderNotes').value || '',
        coupon: currentCoupon ? currentCoupon.code : null,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        discount: currentCoupon ? (currentCoupon.type === 'percentage' ?
            cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (currentCoupon.value / 100) :
            currentCoupon.value) : 0,
        shipping: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) >= freeShippingThreshold ? 0 : shippingCost,
        total: 0,
        status: 'pending'
    };

    orderData.total = orderData.subtotal - orderData.discount + orderData.shipping;

    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('silya-orders')) || [];
    orders.push(orderData);
    localStorage.setItem('silya-orders', JSON.stringify(orders));

    // Add customer to customers list if new
    let customers = JSON.parse(localStorage.getItem('silya-customers')) || [];
    const existingCustomer = customers.find(c => c.phone === orderData.customer.phone);

    if (!existingCustomer) {
        customers.push({
            id: 'CUST-' + Date.now().toString().slice(-6),
            firstName: orderData.customer.name.split(' ')[0],
            lastName: orderData.customer.name.split(' ').slice(1).join(' ') || '',
            email: orderData.customer.email,
            phone: orderData.customer.phone,
            address: orderData.customer.address,
            city: orderData.customer.city,
            registeredDate: new Date().toISOString(),
            totalOrders: 1,
            totalSpent: orderData.total
        });
    } else {
        existingCustomer.totalOrders++;
        existingCustomer.totalSpent += orderData.total;
    }
    localStorage.setItem('silya-customers', JSON.stringify(customers));

    // Show confirmation
    showOrderConfirmation(orderData);

    // Clear cart
    cart = [];
    localStorage.setItem('silya-cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();

    // Close checkout
    closeCheckout();
}

function showOrderConfirmation(orderData) {
    const confirmationModal = document.getElementById('confirmationModal');
    const overlay = document.getElementById('overlay');

    document.getElementById('confirmationOrderNumber').textContent = orderData.id;

    document.getElementById('confirmationSummary').innerHTML = `
        <p><strong>Total:</strong> ${orderData.total.toFixed(2)} DH</p>
        <p><strong>Produits:</strong> ${orderData.products.length} article(s)</p>
        <p><strong>Mode de paiement:</strong> ${orderData.paymentMethod === 'cod' ? 'Paiement à la livraison' : 'Virement bancaire'}</p>
        <p><strong>Livraison à:</strong> ${orderData.customer.city}</p>
    `;

    confirmationModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConfirmation() {
    const confirmationModal = document.getElementById('confirmationModal');
    const overlay = document.getElementById('overlay');

    confirmationModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function viewMyOrders() {
    closeConfirmation();
    showNotification('Fonctionnalité en développement: Page "Mes commandes" à venir', 'info');
    // TODO: Redirect to customer orders page when implemented
}

// ==================== Advanced Filtering & Sorting ====================
let advancedFilters = {
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    inStockOnly: false,
    sortBy: 'default'
};

// Initialize advanced filters
function initializeAdvancedFilters() {
    // Filter toggle
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filtersPanel = document.getElementById('filtersPanel');

    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', () => {
            filtersPanel.classList.toggle('active');
            filterToggleBtn.classList.toggle('active');
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            advancedFilters.sortBy = e.target.value;
            applyFilters();
        });
    }

    // Price range sliders
    const priceRangeMin = document.getElementById('priceRangeMin');
    const priceRangeMax = document.getElementById('priceRangeMax');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    if (priceRangeMin && priceRangeMax) {
        priceRangeMin.addEventListener('input', (e) => {
            const minVal = parseInt(e.target.value);
            const maxVal = parseInt(priceRangeMax.value);
            if (minVal < maxVal) {
                minPriceInput.value = minVal;
                advancedFilters.minPrice = minVal;
            }
        });

        priceRangeMax.addEventListener('input', (e) => {
            const maxVal = parseInt(e.target.value);
            const minVal = parseInt(priceRangeMin.value);
            if (maxVal > minVal) {
                maxPriceInput.value = maxVal;
                advancedFilters.maxPrice = maxVal;
            }
        });
    }

    // Price inputs
    if (minPriceInput) {
        minPriceInput.addEventListener('change', (e) => {
            const val = parseInt(e.target.value) || 0;
            priceRangeMin.value = val;
            advancedFilters.minPrice = val;
        });
    }

    if (maxPriceInput) {
        maxPriceInput.addEventListener('change', (e) => {
            const val = parseInt(e.target.value) || 10000;
            priceRangeMax.value = val;
            advancedFilters.maxPrice = val;
        });
    }

    // Rating filters
    const ratingFilters = document.querySelectorAll('input[name="ratingFilter"]');
    ratingFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            advancedFilters.minRating = parseFloat(e.target.value);
        });
    });

    // Stock filter
    const inStockOnly = document.getElementById('inStockOnly');
    if (inStockOnly) {
        inStockOnly.addEventListener('change', (e) => {
            advancedFilters.inStockOnly = e.target.checked;
        });
    }
}

function applyFilters() {
    let filteredProducts = [...products];

    // Apply category filter if any
    if (currentFilter !== 'all') {
        if (currentFilter === 'new') {
            filteredProducts = filteredProducts.filter(p => p.badge === 'new');
        } else if (currentFilter === 'bestseller') {
            filteredProducts = filteredProducts.filter(p => p.badge === 'bestseller');
        } else if (currentFilter === 'sale') {
            filteredProducts = filteredProducts.filter(p => p.originalPrice && p.originalPrice > p.price);
        } else {
            filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
        }
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(p =>
        p.price >= advancedFilters.minPrice && p.price <= advancedFilters.maxPrice
    );

    // Apply rating filter
    if (advancedFilters.minRating > 0) {
        filteredProducts = filteredProducts.filter(p =>
            (p.rating || 0) >= advancedFilters.minRating
        );
    }

    // Apply stock filter
    if (advancedFilters.inStockOnly) {
        filteredProducts = filteredProducts.filter(p =>
            (p.stock === undefined || p.stock > 0)
        );
    }

    // Apply sorting
    switch (advancedFilters.sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating-desc':
            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        default:
            // Default order (by ID)
            filteredProducts.sort((a, b) => a.id - b.id);
    }

    // Render filtered and sorted products
    renderFilteredProducts(filteredProducts);

    showNotification(`${filteredProducts.length} produit(s) trouvé(s)`, 'info');
}

function renderFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez de modifier vos filtres pour voir plus de résultats</p>
                <button class="btn btn-primary" onclick="resetFilters()" style="margin-top: 1rem;">
                    Réinitialiser les filtres
                </button>
            </div>
        `;
        return;
    }

    // Display products
    const displayProducts = filteredProducts.slice(0, displayedProducts);

    productsGrid.innerHTML = displayProducts.map(product => {
        const isInCart = cart.some(item => item.id === product.id);
        const isInWishlist = wishlist.some(item => item.id === product.id);
        const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="assets/images/${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/placeholder.jpg'">
                    ${product.badge ? `<div class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
                    ${discount > 0 ? `<div class="product-badge badge-sale">-${discount}%</div>` : ''}
                    <div class="product-actions">
                        <button class="product-action-btn quick-view-btn" data-product-id="${product.id}" title="Aperçu rapide">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="product-action-btn wishlist-btn ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}" title="Ajouter à la liste de souhaits">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${getCategoryName(product.category)}</div>
                    <h3 class="product-name" onclick="window.location.href='product-details.html?id=${product.id}'" style="cursor: pointer;">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} DH</span>
                        ${product.originalPrice ? `<span class="original-price">${product.originalPrice} DH</span>` : ''}
                    </div>
                    <div class="product-rating">
                        <div class="stars">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i> ${isInCart ? 'Déjà dans le panier' : 'Ajouter au panier'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Attach product event listeners
    attachProductEventListeners();
}

function resetFilters() {
    // Reset filter values
    advancedFilters = {
        minPrice: 0,
        maxPrice: 10000,
        minRating: 0,
        inStockOnly: false,
        sortBy: 'default'
    };

    // Reset UI
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('priceRangeMin').value = 0;
    document.getElementById('priceRangeMax').value = 1000;
    document.getElementById('sortSelect').value = 'default';
    document.querySelector('input[name="ratingFilter"][value="0"]').checked = true;
    document.getElementById('inStockOnly').checked = false;

    // Close filters panel
    document.getElementById('filtersPanel').classList.remove('active');
    document.getElementById('filterToggleBtn').classList.remove('active');

    // Re-render products
    renderProducts(currentFilter);
    showNotification('Filtres réinitialisés', 'info');
}

// Initialize advanced filters on load
document.addEventListener('DOMContentLoaded', () => {
    initializeAdvancedFilters();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
