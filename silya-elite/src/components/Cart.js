/**
 * ============================================
 * Cart Component - Shopping Cart Sidebar
 * Silya's Elite V3
 * ============================================
 */

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            items: [],
            totals: {
                subtotal: 0,
                tax: 0,
                shipping: 0,
                discount: 0,
                total: 0
            }
        };
    }

    componentDidMount() {
        // Subscribe to store changes
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.setState({
                isOpen: state.ui.cartOpen,
                items: state.cart.items,
                totals: {
                    subtotal: state.cart.subtotal,
                    tax: state.cart.tax,
                    shipping: state.cart.shipping,
                    discount: state.cart.discount,
                    total: state.cart.total
                }
            });
        });

        // Initial state
        this.updateFromStore();
    }

    componentWillUnmount() {
        this.unsubscribe?.();
    }

    updateFromStore() {
        const state = store.getState();
        this.setState({
            isOpen: state.ui.cartOpen,
            items: state.cart.items,
            totals: {
                subtotal: state.cart.subtotal,
                tax: state.cart.tax,
                shipping: state.cart.shipping,
                discount: state.cart.discount,
                total: state.cart.total
            }
        });
    }

    close() {
        cartService.toggleCart();
    }

    removeItem(productId) {
        cartService.removeFromCart(productId);
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
        } else {
            cartService.updateQuantity(productId, newQuantity);
        }
    }

    goToCheckout() {
        this.close();
        window.location.hash = '#/checkout';
    }

    continueShopping() {
        this.close();
        window.location.hash = '#/products';
    }

    render() {
        const { isOpen, items, totals } = this.state;

        return `
            <!-- Cart Overlay -->
            <div class="cart-overlay ${isOpen ? 'active' : ''}" onclick="cartInstance.close()"></div>

            <!-- Cart Sidebar -->
            <div class="cart-sidebar ${isOpen ? 'active' : ''}" data-component="cart">
                <!-- Cart Header -->
                <div class="cart-header">
                    <h2 class="cart-title">
                        <i class="fas fa-shopping-cart"></i>
                        Panier
                        <span class="cart-count">(${items.length})</span>
                    </h2>
                    <button class="cart-close-btn" onclick="cartInstance.close()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Cart Content -->
                ${items.length === 0 ? this.renderEmptyCart() : this.renderCartItems(items, totals)}
            </div>
        `;
    }

    renderEmptyCart() {
        return `
            <div class="cart-empty">
                <div class="empty-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h3>Votre panier est vide</h3>
                <p>Découvrez nos produits et ajoutez vos favoris!</p>
                <button class="btn btn-primary" onclick="cartInstance.continueShopping()">
                    <i class="fas fa-shopping-bag"></i>
                    Découvrir nos produits
                </button>
            </div>
        `;
    }

    renderCartItems(items, totals) {
        return `
            <!-- Cart Items -->
            <div class="cart-items">
                ${items.map(item => this.renderCartItem(item)).join('')}
            </div>

            <!-- Cart Footer -->
            <div class="cart-footer">
                <!-- Totals Summary -->
                <div class="cart-totals">
                    <div class="total-row">
                        <span>Sous-total</span>
                        <span>${totals.subtotal.toFixed(2)} MAD</span>
                    </div>
                    <div class="total-row">
                        <span>TVA (20%)</span>
                        <span>${totals.tax.toFixed(2)} MAD</span>
                    </div>
                    <div class="total-row">
                        <span>Livraison</span>
                        <span>${totals.shipping === 0 ? 'GRATUITE' : totals.shipping.toFixed(2) + ' MAD'}</span>
                    </div>
                    ${totals.discount > 0 ? `
                        <div class="total-row discount">
                            <span>Réduction</span>
                            <span>-${totals.discount.toFixed(2)} MAD</span>
                        </div>
                    ` : ''}
                    <div class="total-row total-main">
                        <span>Total</span>
                        <span class="total-amount">${totals.total.toFixed(2)} MAD</span>
                    </div>
                </div>

                <!-- Shipping Info -->
                ${totals.subtotal < 500 ? `
                    <div class="shipping-info">
                        <i class="fas fa-truck"></i>
                        Plus que <strong>${(500 - totals.subtotal).toFixed(2)} MAD</strong> pour la livraison gratuite!
                    </div>
                ` : `
                    <div class="shipping-info free">
                        <i class="fas fa-check-circle"></i>
                        Vous bénéficiez de la <strong>livraison gratuite!</strong>
                    </div>
                `}

                <!-- Actions -->
                <div class="cart-actions">
                    <button class="btn btn-primary btn-block btn-lg" onclick="cartInstance.goToCheckout()">
                        <i class="fas fa-credit-card"></i>
                        Passer la commande
                    </button>
                    <button class="btn btn-outline-primary btn-block" onclick="cartInstance.continueShopping()">
                        <i class="fas fa-arrow-left"></i>
                        Continuer les achats
                    </button>
                </div>
            </div>
        `;
    }

    renderCartItem(item) {
        return `
            <div class="cart-item">
                <!-- Item Image -->
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <!-- Item Details -->
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    ${item.brand ? `<div class="cart-item-brand">${item.brand}</div>` : ''}
                    <div class="cart-item-price">${item.price} MAD</div>

                    <!-- Quantity Controls -->
                    <div class="quantity-controls">
                        <button
                            class="qty-btn"
                            onclick="cartInstance.updateQuantity(${item.id}, ${item.quantity - 1})"
                        >
                            <i class="fas fa-minus"></i>
                        </button>
                        <input
                            type="number"
                            class="qty-input"
                            value="${item.quantity}"
                            min="1"
                            onchange="cartInstance.updateQuantity(${item.id}, parseInt(this.value))"
                        >
                        <button
                            class="qty-btn"
                            onclick="cartInstance.updateQuantity(${item.id}, ${item.quantity + 1})"
                        >
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>

                <!-- Item Actions -->
                <div class="cart-item-actions">
                    <button
                        class="cart-item-remove"
                        onclick="cartInstance.removeItem(${item.id})"
                        title="Retirer"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                    <div class="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)} MAD
                    </div>
                </div>
            </div>
        `;
    }
}

// Create and mount cart instance
let cartInstance;
document.addEventListener('DOMContentLoaded', () => {
    cartInstance = new Cart();
    window.cartInstance = cartInstance;
});
