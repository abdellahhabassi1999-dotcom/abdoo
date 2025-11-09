/**
 * ============================================
 * Product Detail Page - Single Product View
 * Silya's Elite V3
 * ============================================
 */

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            quantity: 1,
            isInWishlist: false,
            isInCart: false,
            relatedProducts: [],
            loading: true
        };
    }

    async componentDidMount() {
        const productId = this.getProductId();
        await this.loadProduct(productId);

        // Subscribe to store
        this.unsubscribe = store.subscribe(() => {
            this.updateStatus();
        });
    }

    componentWillUnmount() {
        this.unsubscribe?.();
    }

    getProductId() {
        const hash = window.location.hash;
        const match = hash.match(/\/product\/(\d+)/);
        return match ? parseInt(match[1]) : null;
    }

    async loadProduct(productId) {
        try {
            this.setState({ loading: true });

            const product = await api.getProduct(productId);
            const relatedProducts = await api.getProducts({ category: product.category });

            this.setState({
                product,
                relatedProducts: relatedProducts.filter(p => p.id !== product.id).slice(0, 4),
                loading: false
            });

            this.updateStatus();
        } catch (error) {
            console.error('Error loading product:', error);
            this.setState({ loading: false });
        }
    }

    updateStatus() {
        if (!this.state.product) return;

        const state = store.getState();
        const isInWishlist = state.wishlist.some(item => item.id === this.state.product.id);
        const isInCart = state.cart.items.some(item => item.id === this.state.product.id);

        this.setState({ isInWishlist, isInCart });
    }

    updateQuantity(newQuantity) {
        if (newQuantity >= 1 && newQuantity <= this.state.product.stock) {
            this.setState({ quantity: newQuantity });
        }
    }

    addToCart() {
        const { product, quantity } = this.state;
        cartService.addToCart(product, quantity);
    }

    toggleWishlist() {
        const { product, isInWishlist } = this.state;

        if (isInWishlist) {
            store.dispatch({
                type: ActionTypes.REMOVE_FROM_WISHLIST,
                payload: product.id
            });
        } else {
            store.dispatch({
                type: ActionTypes.ADD_TO_WISHLIST,
                payload: product
            });
        }
    }

    buyNow() {
        this.addToCart();
        window.location.hash = '#/checkout';
    }

    render() {
        const { product, quantity, isInWishlist, isInCart, relatedProducts, loading } = this.state;

        if (loading) {
            return this.renderLoadingSkeleton();
        }

        if (!product) {
            return this.renderNotFound();
        }

        return `
            <div class="product-detail-page" data-page="product-detail">
                <div class="container">
                    <!-- Breadcrumb -->
                    <nav class="breadcrumb">
                        <a href="#/">Accueil</a>
                        <span>/</span>
                        <a href="#/products">Produits</a>
                        <span>/</span>
                        <span>${product.name}</span>
                    </nav>

                    <!-- Product Detail -->
                    <div class="product-detail">
                        <!-- Product Image -->
                        <div class="product-detail-image">
                            <img src="${product.image}" alt="${product.name}">
                            ${product.discount > 0 ? `
                                <div class="discount-badge">-${product.discount}%</div>
                            ` : ''}
                        </div>

                        <!-- Product Info -->
                        <div class="product-detail-info">
                            <!-- Brand & Category -->
                            <div class="product-meta">
                                ${product.brand ? `<span class="brand">${product.brand}</span>` : ''}
                                <span class="category">${product.category}</span>
                            </div>

                            <!-- Name -->
                            <h1 class="product-title">${product.name}</h1>

                            <!-- Rating -->
                            <div class="product-rating">
                                ${this.renderStars(product.rating || 0)}
                                <span class="rating-count">${product.reviews || 0} avis</span>
                            </div>

                            <!-- Price -->
                            <div class="product-price">
                                <div class="current-price">${product.price} MAD</div>
                                ${product.originalPrice ? `
                                    <div class="original-price">${product.originalPrice} MAD</div>
                                    <div class="savings">Économisez ${product.originalPrice - product.price} MAD</div>
                                ` : ''}
                            </div>

                            <!-- Description -->
                            <div class="product-description">
                                <p>${product.description}</p>
                            </div>

                            <!-- Stock Status -->
                            <div class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                ${product.inStock ?
                                    `En stock (${product.stock} unités disponibles)` :
                                    'Rupture de stock'
                                }
                            </div>

                            <!-- Quantity Selector -->
                            ${product.inStock ? `
                                <div class="quantity-selector">
                                    <label>Quantité:</label>
                                    <div class="quantity-controls">
                                        <button
                                            class="qty-btn"
                                            onclick="productDetailInstance.updateQuantity(${quantity - 1})"
                                        >
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <input
                                            type="number"
                                            class="qty-input"
                                            value="${quantity}"
                                            min="1"
                                            max="${product.stock}"
                                            onchange="productDetailInstance.updateQuantity(parseInt(this.value))"
                                        >
                                        <button
                                            class="qty-btn"
                                            onclick="productDetailInstance.updateQuantity(${quantity + 1})"
                                        >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Action Buttons -->
                            <div class="product-actions">
                                ${product.inStock ? `
                                    <button
                                        class="btn btn-primary btn-lg btn-block"
                                        onclick="productDetailInstance.addToCart()"
                                    >
                                        <i class="fas fa-shopping-cart"></i>
                                        ${isInCart ? 'Ajouter plus au panier' : 'Ajouter au panier'}
                                    </button>
                                    <button
                                        class="btn btn-success btn-lg btn-block"
                                        onclick="productDetailInstance.buyNow()"
                                    >
                                        <i class="fas fa-bolt"></i>
                                        Acheter maintenant
                                    </button>
                                ` : `
                                    <button class="btn btn-secondary btn-lg btn-block" disabled>
                                        <i class="fas fa-ban"></i>
                                        Produit indisponible
                                    </button>
                                `}
                                <button
                                    class="btn ${isInWishlist ? 'btn-danger' : 'btn-outline-primary'} btn-lg btn-block"
                                    onclick="productDetailInstance.toggleWishlist()"
                                >
                                    <i class="fas fa-heart"></i>
                                    ${isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                                </button>
                            </div>

                            <!-- Features -->
                            <div class="product-features">
                                <div class="feature">
                                    <i class="fas fa-shipping-fast"></i>
                                    <span>Livraison gratuite dès 500 MAD</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-shield-check"></i>
                                    <span>Produit authentique garanti</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-undo"></i>
                                    <span>Retour sous 7 jours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Related Products -->
                    ${relatedProducts.length > 0 ? `
                        <section class="related-products section">
                            <h2 class="section-title">Produits similaires</h2>
                            <div class="products-grid">
                                ${relatedProducts.map(p => this.renderProductCard(p)).join('')}
                            </div>
                        </section>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHTML = '';

        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        return starsHTML;
    }

    renderProductCard(product) {
        const card = new ProductCard({ product });
        window.productCardInstances[product.id] = card;
        return card.render();
    }

    renderLoadingSkeleton() {
        return `<div class="loading-skeleton">Loading...</div>`;
    }

    renderNotFound() {
        return `
            <div class="container">
                <div class="not-found">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Produit non trouvé</h2>
                    <a href="#/products" class="btn btn-primary">Retour aux produits</a>
                </div>
            </div>
        `;
    }
}

// Create instance
let productDetailInstance;
window.ProductDetailPage = ProductDetailPage;
