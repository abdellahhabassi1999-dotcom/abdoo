/* ====================================
   Product Details Page JavaScript
   ==================================== */

let currentProduct = null;
let productReviews = [];
let selectedRating = 0;
let productQuantity = 1;

// Initialize product details page
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    initializeReviewModal();
});

// Load product details from URL parameter
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Produit non trouvé');
        return;
    }

    // Load products data
    try {
        let products = JSON.parse(localStorage.getItem('silya-products'));

        if (!products || products.length === 0) {
            // Try embedded data first (works with file:// protocol)
            if (typeof PRODUCTS_DATA !== 'undefined') {
                products = PRODUCTS_DATA;
                console.log('Product details loaded from embedded data.js');
            } else {
                // Fallback: Load from JSON (works with web server)
                const response = await fetch('assets/data/products.json');
                if (response.ok) {
                    products = await response.json();
                } else {
                    products = getDefaultProductsForDetails();
                }
            }
        }

        currentProduct = products.find(p => p.id === parseInt(productId));

        if (!currentProduct) {
            showError('Produit non trouvé');
            return;
        }

        // Load reviews from localStorage
        const allReviews = JSON.parse(localStorage.getItem('silya-reviews')) || {};
        productReviews = allReviews[productId] || [];

        renderProductDetails();
        loadRelatedProducts();

    } catch (error) {
        console.error('Error loading product:', error);
        showError('Erreur lors du chargement du produit');
    }
}

// Render product details
function renderProductDetails() {
    if (!currentProduct) return;

    const container = document.getElementById('productDetailsContent');
    const discount = currentProduct.originalPrice ?
        Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100) : 0;

    // Update page title and breadcrumb
    document.getElementById('pageTitle').textContent = `${currentProduct.name} - Silya's Parfumerie`;
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

    // Calculate average rating
    const avgRating = productReviews.length > 0 ?
        (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1) : 0;

    // Check if in wishlist
    const isInWishlist = wishlist.some(item => item.id === currentProduct.id);

    // Determine stock status
    const stock = currentProduct.stock || 100;
    let stockClass = 'in-stock';
    let stockText = `En stock (${stock} disponibles)`;
    let stockIcon = 'fa-check-circle';

    if (stock === 0) {
        stockClass = 'out-of-stock';
        stockText = 'Rupture de stock';
        stockIcon = 'fa-times-circle';
    } else if (stock <= 10) {
        stockClass = 'low-stock';
        stockText = `Stock limité (${stock} restants)`;
        stockIcon = 'fa-exclamation-circle';
    }

    container.innerHTML = `
        <!-- Product Gallery -->
        <div class="product-gallery">
            <div class="main-image-container">
                <img src="assets/images/${currentProduct.image}" alt="${currentProduct.name}" class="main-image" id="mainImage">
                ${currentProduct.badge ? `
                    <div class="product-badge-detail badge-${currentProduct.badge}">
                        ${getBadgeText(currentProduct.badge)}
                    </div>
                ` : ''}
                <button class="wishlist-btn-detail ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistDetail()">
                    <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="thumbnail-gallery" id="thumbnailGallery">
                ${generateThumbnails()}
            </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
            <span class="product-category-tag">${getCategoryName(currentProduct.category)}</span>
            <h1>${currentProduct.name}</h1>

            <div class="product-rating-detail">
                <div class="stars">${generateStars(avgRating)}</div>
                <span class="rating-score">${avgRating}</span>
                <span class="rating-count">(${productReviews.length} avis)</span>
                <button class="write-review-btn" onclick="openReviewModal()">Écrire un avis</button>
            </div>

            <div class="product-price-detail">
                <span class="current-price-detail">${currentProduct.price} DH</span>
                ${currentProduct.originalPrice ? `
                    <span class="original-price-detail">${currentProduct.originalPrice} DH</span>
                    <span class="discount-badge-detail">-${discount}%</span>
                ` : ''}
            </div>

            <div class="stock-status ${stockClass}">
                <i class="fas ${stockIcon}"></i>
                <span>${stockText}</span>
            </div>

            <p class="product-description">
                ${currentProduct.description || 'Découvrez ce produit exceptionnel de notre collection. Qualité premium garantie.'}
            </p>

            <ul class="product-details-list">
                <li><i class="fas fa-tag"></i> <strong>Marque:</strong> ${currentProduct.brand || 'Premium'}</li>
                <li><i class="fas fa-box"></i> <strong>Référence:</strong> PRD-${currentProduct.id.toString().padStart(4, '0')}</li>
                <li><i class="fas fa-truck"></i> <strong>Livraison:</strong> 24-48h à Kénitra</li>
                <li><i class="fas fa-undo"></i> <strong>Retours:</strong> 14 jours pour changer d'avis</li>
            </ul>

            ${stock > 0 ? `
                <div class="quantity-selector">
                    <label>Quantité:</label>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantityInput" value="1" min="1" max="${stock}" readonly>
                        <button onclick="increaseQuantity()">+</button>
                    </div>
                </div>

                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCartDetail()">
                        <i class="fas fa-shopping-cart"></i> Ajouter au panier
                    </button>
                    <button class="btn btn-secondary" onclick="buyNow()">
                        <i class="fas fa-bolt"></i> Acheter maintenant
                    </button>
                </div>
            ` : `
                <button class="btn btn-secondary" disabled>
                    <i class="fas fa-times"></i> Indisponible
                </button>
            `}

            <!-- Product Tabs -->
            <div class="product-tabs">
                <div class="tab-buttons">
                    <button class="tab-button active" onclick="switchTab('description')">Description</button>
                    <button class="tab-button" onclick="switchTab('reviews')">Avis (${productReviews.length})</button>
                </div>

                <div class="tab-content active" id="descriptionTab">
                    <h3>Description détaillée</h3>
                    <p>${currentProduct.description || 'Ce produit premium fait partie de notre collection exclusive. Fabriqué avec des ingrédients de haute qualité pour vous garantir une expérience exceptionnelle.'}</p>
                    <p>Caractéristiques principales:</p>
                    <ul>
                        <li>Qualité premium garantie</li>
                        <li>Authentique et certifié</li>
                        <li>Longue tenue</li>
                        <li>Adapté à tous types de peau</li>
                    </ul>
                </div>

                <div class="tab-content" id="reviewsTab">
                    ${renderReviewsSection()}
                </div>
            </div>
        </div>
    `;
}

// Generate thumbnail images
function generateThumbnails() {
    // For now, use the same image as thumbnails (can be expanded with multiple images)
    const images = [
        currentProduct.image,
        currentProduct.image,
        currentProduct.image,
        currentProduct.image
    ];

    return images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
            <img src="assets/images/${img}" alt="Thumbnail ${index + 1}">
        </div>
    `).join('');
}

// Change main image
function changeMainImage(imageSrc, thumbnail) {
    document.getElementById('mainImage').src = `assets/images/${imageSrc}`;
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    const max = parseInt(input.max);
    if (productQuantity < max) {
        productQuantity++;
        input.value = productQuantity;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (productQuantity > 1) {
        productQuantity--;
        input.value = productQuantity;
    }
}

// Add to cart from detail page
function addToCartDetail() {
    if (!currentProduct) return;

    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity += productQuantity;
    } else {
        cart.push({ ...currentProduct, quantity: productQuantity });
    }

    localStorage.setItem('silya-cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showNotification(`${productQuantity} × ${currentProduct.name} ajouté au panier`, 'success');

    // Reset quantity
    productQuantity = 1;
    document.getElementById('quantityInput').value = 1;
}

// Buy now - add to cart and go to checkout
function buyNow() {
    addToCartDetail();
    window.location.href = 'index.html#checkout';
}

// Toggle wishlist from detail page
function toggleWishlistDetail() {
    if (!currentProduct) return;

    const index = wishlist.findIndex(item => item.id === currentProduct.id);
    const btn = document.querySelector('.wishlist-btn-detail');
    const icon = btn.querySelector('i');

    if (index > -1) {
        wishlist.splice(index, 1);
        btn.classList.remove('active');
        icon.className = 'far fa-heart';
        showNotification('Retiré de la liste de souhaits', 'info');
    } else {
        wishlist.push(currentProduct);
        btn.classList.add('active');
        icon.className = 'fas fa-heart';
        showNotification('Ajouté à la liste de souhaits', 'success');
    }

    localStorage.setItem('silya-wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
}

// Switch product tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Render reviews section
function renderReviewsSection() {
    if (productReviews.length === 0) {
        return `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="far fa-comment" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                <p>Aucun avis pour le moment. Soyez le premier à laisser un avis!</p>
                <button class="btn btn-primary" onclick="openReviewModal()" style="margin-top: 1rem;">
                    Écrire un avis
                </button>
            </div>
        `;
    }

    // Calculate rating distribution
    const ratingDist = [0, 0, 0, 0, 0];
    productReviews.forEach(review => ratingDist[review.rating - 1]++);
    const avgRating = (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1);

    return `
        <div class="reviews-summary">
            <div class="average-rating">
                <div class="average-rating-score">${avgRating}</div>
                <div class="average-rating-stars">${generateStars(avgRating)}</div>
                <div class="average-rating-count">${productReviews.length} avis</div>
            </div>
            <div class="rating-breakdown">
                ${[5, 4, 3, 2, 1].map(star => `
                    <div class="rating-bar">
                        <div class="rating-bar-label">${star} <i class="fas fa-star"></i></div>
                        <div class="rating-bar-fill">
                            <div class="rating-bar-progress" style="width: ${(ratingDist[star - 1] / productReviews.length) * 100}%"></div>
                        </div>
                        <div class="rating-bar-count">${ratingDist[star - 1]}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <button class="btn btn-primary" onclick="openReviewModal()" style="margin-bottom: 2rem;">
            <i class="fas fa-plus"></i> Écrire un avis
        </button>

        <div class="reviews-list">
            ${productReviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${review.name}</span>
                        <span class="review-date">${new Date(review.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div class="review-rating">${generateStars(review.rating)}</div>
                    <p class="review-comment">${review.comment}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Initialize review modal
function initializeReviewModal() {
    const starRating = document.getElementById('starRating');
    if (starRating) {
        starRating.querySelectorAll('i').forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-rating'));
                document.getElementById('reviewRating').value = selectedRating;
                updateStarDisplay();
            });
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
}

function updateStarDisplay() {
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.className = 'fas fa-star active';
        } else {
            star.className = 'far fa-star';
        }
    });
}

function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    const overlay = document.getElementById('overlay');

    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    const overlay = document.getElementById('overlay');

    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';

    // Reset form
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    updateStarDisplay();
}

function submitReview(e) {
    e.preventDefault();

    if (selectedRating === 0) {
        showNotification('Veuillez sélectionner une note', 'warning');
        return;
    }

    const review = {
        id: Date.now(),
        productId: currentProduct.id,
        name: document.getElementById('reviewName').value,
        rating: selectedRating,
        comment: document.getElementById('reviewComment').value,
        date: new Date().toISOString()
    };

    // Add review to product reviews
    productReviews.push(review);

    // Save to localStorage
    const allReviews = JSON.parse(localStorage.getItem('silya-reviews')) || {};
    allReviews[currentProduct.id] = productReviews;
    localStorage.setItem('silya-reviews', JSON.stringify(allReviews));

    showNotification('Merci pour votre avis!', 'success');
    closeReviewModal();

    // Refresh reviews section
    document.getElementById('reviewsTab').innerHTML = renderReviewsSection();

    // Update review count in tab button
    const reviewTabBtn = document.querySelectorAll('.tab-button')[1];
    if (reviewTabBtn) {
        reviewTabBtn.textContent = `Avis (${productReviews.length})`;
    }
}

// Load related products
function loadRelatedProducts() {
    if (!currentProduct) return;

    const relatedGrid = document.getElementById('relatedProductsGrid');
    let allProducts = JSON.parse(localStorage.getItem('silya-products')) ||
                      (typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : getDefaultProductsForDetails());

    // Filter products from same category, excluding current product
    let relatedProducts = allProducts
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    // If not enough, add random products
    if (relatedProducts.length < 4) {
        const additionalProducts = allProducts
            .filter(p => p.id !== currentProduct.id && !relatedProducts.includes(p))
            .slice(0, 4 - relatedProducts.length);
        relatedProducts = [...relatedProducts, ...additionalProducts];
    }

    relatedGrid.innerHTML = relatedProducts.map(product => {
        const discount = product.originalPrice ?
            Math.round((1 - product.price / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card" onclick="window.location.href='product-details.html?id=${product.id}'">
                <div class="product-image">
                    <img src="assets/images/${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
                    ${product.badge ? `<div class="product-badge badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating || 4)}</div>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${product.price} DH</span>
                        ${product.originalPrice ? `<span class="original-price">${product.originalPrice} DH</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Show error message
function showError(message) {
    const container = document.getElementById('productDetailsContent');
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 0; grid-column: 1 / -1;">
            <i class="fas fa-exclamation-circle" style="font-size: 4rem; color: var(--danger); margin-bottom: 1rem;"></i>
            <h2>${message}</h2>
            <p style="color: var(--text-secondary); margin: 1rem 0;">Le produit demandé n'existe pas ou n'est plus disponible.</p>
            <a href="index.html" class="btn btn-primary">Retour à l'accueil</a>
        </div>
    `;
}

// Default products for details page (fallback)
function getDefaultProductsForDetails() {
    return [
        {
            id: 1,
            name: "Parfum Luxe Rose",
            category: 1,
            price: 299,
            originalPrice: 399,
            image: "products/perfume1.jpg",
            badge: "new",
            rating: 4.5,
            stock: 25,
            brand: "Elegance",
            description: "Un parfum élégant aux notes florales de rose, parfait pour toutes les occasions."
        },
        {
            id: 2,
            name: "Eau de Toilette Lavande",
            category: 1,
            price: 199,
            image: "products/perfume2.jpg",
            rating: 4.2,
            stock: 30,
            brand: "Fresh",
            description: "Fraîcheur et élégance avec des notes de lavande naturelle."
        }
    ];
}
