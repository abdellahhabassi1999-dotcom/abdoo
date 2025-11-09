/**
 * ============================================
 * ProductCard Component - Product Display Card
 * Silya's Elite V3
 * ============================================
 */

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInWishlist: false,
            isInCart: false
        };
    }

    componentDidMount() {
        this.checkWishlistStatus();
        this.checkCartStatus();

        // Subscribe to store changes
        this.unsubscribe = store.subscribe(() => {
            this.checkWishlistStatus();
            this.checkCartStatus();
        });
    }

    componentWillUnmount() {
        this.unsubscribe?.();
    }

    checkWishlistStatus() {
        const state = store.getState();
        const isInWishlist = state.wishlist.some(item => item.id === this.props.product.id);
        if (this.state.isInWishlist !== isInWishlist) {
            this.setState({ isInWishlist });
        }
    }

    checkCartStatus() {
        const state = store.getState();
        const isInCart = state.cart.items.some(item => item.id === this.props.product.id);
        if (this.state.isInCart !== isInCart) {
            this.setState({ isInCart });
        }
    }

    addToCart(e) {
        e.stopPropagation();
        cartService.addToCart(this.props.product);
    }

    toggleWishlist(e) {
        e.stopPropagation();
        const { product } = this.props;

        if (this.state.isInWishlist) {
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

    viewDetails() {
        window.location.hash = `#/product/${this.props.product.id}`;
    }

    render() {
        const { product } = this.props;
        const { isInWishlist, isInCart } = this.state;

        const discountPercentage = product.discount || 0;
        const hasDiscount = discountPercentage > 0;

        return `
            <div class="product-card" onclick="productCardInstances['${product.id}'].viewDetails()">
                <!-- Product Image -->
                <div class="product-card-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">

                    <!-- Badges -->
                    <div class="product-badges">
                        ${product.new ? '<span class="badge badge-new">Nouveau</span>' : ''}
                        ${hasDiscount ? `<span class="badge badge-sale">-${discountPercentage}%</span>` : ''}
                        ${!product.inStock ? '<span class="badge badge-out">Rupture</span>' : ''}
                    </div>

                    <!-- Wishlist Button -->
                    <button
                        class="product-wishlist-btn ${isInWishlist ? 'active' : ''}"
                        onclick="event.stopPropagation(); productCardInstances['${product.id}'].toggleWishlist(event)"
                        title="${isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
                    >
                        <i class="fas fa-heart"></i>
                    </button>

                    <!-- Quick View Overlay -->
                    <div class="product-overlay">
                        <button class="btn btn-outline-white btn-sm" onclick="productCardInstances['${product.id}'].viewDetails()">
                            <i class="fas fa-eye"></i>
                            Vue rapide
                        </button>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="product-card-body">
                    <!-- Brand -->
                    ${product.brand ? `<div class="product-brand">${product.brand}</div>` : ''}

                    <!-- Name -->
                    <h3 class="product-name">${product.name}</h3>

                    <!-- Rating -->
                    <div class="product-rating">
                        <div class="stars">
                            ${this.renderStars(product.rating || 0)}
                        </div>
                        <span class="rating-text">${product.rating || 0} (${product.reviews || 0})</span>
                    </div>

                    <!-- Price -->
                    <div class="product-price">
                        <span class="current-price">${product.price} MAD</span>
                        ${hasDiscount && product.originalPrice ?
                            `<span class="original-price">${product.originalPrice} MAD</span>` :
                            ''
                        }
                    </div>

                    <!-- Stock Status -->
                    ${product.inStock ?
                        `<div class="product-stock in-stock">
                            <i class="fas fa-check-circle"></i>
                            En stock (${product.stock || 0})
                        </div>` :
                        `<div class="product-stock out-of-stock">
                            <i class="fas fa-times-circle"></i>
                            Rupture de stock
                        </div>`
                    }

                    <!-- Actions -->
                    <div class="product-actions">
                        ${product.inStock ? `
                            <button
                                class="btn ${isInCart ? 'btn-outline-primary' : 'btn-primary'} btn-block"
                                onclick="event.stopPropagation(); productCardInstances['${product.id}'].addToCart(event)"
                            >
                                <i class="fas fa-shopping-cart"></i>
                                ${isInCart ? 'Déjà au panier' : 'Ajouter au panier'}
                            </button>
                        ` : `
                            <button class="btn btn-outline-secondary btn-block" disabled>
                                <i class="fas fa-ban"></i>
                                Indisponible
                            </button>
                        `}
                    </div>
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
}

// Store instances for event handling
window.productCardInstances = window.productCardInstances || {};
