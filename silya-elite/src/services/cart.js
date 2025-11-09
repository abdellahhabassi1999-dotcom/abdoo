/**
 * ============================================
 * Cart Service - Shopping Cart Management
 * Silya's Elite V3
 * ============================================
 */

class CartService {
    constructor() {
        this.store = window.store;
        this.api = window.api;
    }

    /**
     * Add product to cart
     */
    addToCart(product, quantity = 1) {
        this.store.dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: { ...product, quantity }
        });

        this.showNotification(`${product.name} ajouté au panier`, 'success');
    }

    /**
     * Remove product from cart
     */
    removeFromCart(productId) {
        this.store.dispatch({
            type: ActionTypes.REMOVE_FROM_CART,
            payload: productId
        });

        this.showNotification('Produit retiré du panier', 'info');
    }

    /**
     * Update product quantity
     */
    updateQuantity(productId, quantity) {
        this.store.dispatch({
            type: ActionTypes.UPDATE_CART_QUANTITY,
            payload: { id: productId, quantity }
        });
    }

    /**
     * Clear entire cart
     */
    clearCart() {
        this.store.dispatch({
            type: ActionTypes.CLEAR_CART
        });

        this.showNotification('Panier vidé', 'info');
    }

    /**
     * Apply coupon code
     */
    async applyCoupon(code) {
        try {
            const coupon = await this.api.validateCoupon(code);

            const state = this.store.getState();
            const subtotal = state.cart.subtotal;

            if (coupon.minOrder && subtotal < coupon.minOrder) {
                throw new Error(`Commande minimum de ${coupon.minOrder} MAD requise`);
            }

            this.store.dispatch({
                type: ActionTypes.APPLY_COUPON,
                payload: coupon
            });

            this.showNotification('Code promo appliqué avec succès!', 'success');
            return true;
        } catch (error) {
            this.showNotification(error.message, 'error');
            return false;
        }
    }

    /**
     * Remove coupon
     */
    removeCoupon() {
        this.store.dispatch({
            type: ActionTypes.APPLY_COUPON,
            payload: null
        });

        this.showNotification('Code promo retiré', 'info');
    }

    /**
     * Get cart items
     */
    getCartItems() {
        return this.store.getState().cart.items;
    }

    /**
     * Get cart totals
     */
    getCartTotals() {
        const { subtotal, tax, shipping, discount, total } = this.store.getState().cart;
        return { subtotal, tax, shipping, discount, total };
    }

    /**
     * Get cart item count
     */
    getCartCount() {
        return this.store.getState().cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Check if product is in cart
     */
    isInCart(productId) {
        return this.store.getState().cart.items.some(item => item.id === productId);
    }

    /**
     * Toggle cart sidebar
     */
    toggleCart() {
        this.store.dispatch({
            type: ActionTypes.TOGGLE_CART
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        this.store.dispatch({
            type: ActionTypes.SHOW_NOTIFICATION,
            payload: { message, type }
        });

        setTimeout(() => {
            this.store.dispatch({
                type: ActionTypes.HIDE_NOTIFICATION
            });
        }, 3000);
    }
}

// Create singleton instance
const cartService = new CartService();
window.cartService = cartService;
