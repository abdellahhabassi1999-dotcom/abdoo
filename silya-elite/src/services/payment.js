/**
 * ============================================
 * Payment Service - Payment Processing
 * Silya's Elite V3
 * ============================================
 */

class PaymentService {
    constructor() {
        this.store = window.store;
        this.api = window.api;
        this.cartService = window.cartService;
    }

    /**
     * Process WhatsApp order (primary method for Morocco)
     */
    async processWhatsAppOrder(customerInfo) {
        try {
            const state = this.store.getState();
            const { items, total } = state.cart;

            if (items.length === 0) {
                throw new Error('Votre panier est vide');
            }

            // Validate customer info
            this.validateCustomerInfo(customerInfo);

            // Create order data
            const orderData = {
                items,
                total,
                customer: customerInfo,
                paymentMethod: 'whatsapp',
                createdAt: new Date().toISOString()
            };

            // Send WhatsApp message
            this.api.sendWhatsAppOrder(orderData);

            // Add order to store
            this.store.dispatch({
                type: ActionTypes.ADD_ORDER,
                payload: orderData
            });

            // Clear cart
            this.cartService.clearCart();

            this.showNotification('Commande envoyée via WhatsApp!', 'success');

            return orderData;
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    /**
     * Process cash on delivery order
     */
    async processCashOnDelivery(customerInfo) {
        try {
            const state = this.store.getState();
            const { items, total } = state.cart;

            if (items.length === 0) {
                throw new Error('Votre panier est vide');
            }

            // Validate customer info
            this.validateCustomerInfo(customerInfo);

            // Create order
            const orderData = {
                items,
                total,
                customer: customerInfo,
                paymentMethod: 'cod',
                createdAt: new Date().toISOString()
            };

            // Submit order to backend
            const order = await this.api.submitOrder(orderData);

            // Add order to store
            this.store.dispatch({
                type: ActionTypes.ADD_ORDER,
                payload: order
            });

            // Clear cart
            this.cartService.clearCart();

            this.showNotification('Commande confirmée! Paiement à la livraison', 'success');

            return order;
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    /**
     * Process online payment (Stripe/PayPal/CMI)
     */
    async processOnlinePayment(customerInfo, paymentMethod = 'stripe') {
        try {
            const state = this.store.getState();
            const { items, total } = state.cart;

            if (items.length === 0) {
                throw new Error('Votre panier est vide');
            }

            // Validate customer info
            this.validateCustomerInfo(customerInfo);

            // Create order data
            const orderData = {
                items,
                total,
                customer: customerInfo,
                paymentMethod,
                createdAt: new Date().toISOString()
            };

            // In production, integrate with payment gateway
            // For now, simulate payment
            await this.simulatePayment(total, paymentMethod);

            // Submit order
            const order = await this.api.submitOrder(orderData);

            // Add order to store
            this.store.dispatch({
                type: ActionTypes.ADD_ORDER,
                payload: order
            });

            // Clear cart
            this.cartService.clearCart();

            this.showNotification('Paiement réussi! Commande confirmée', 'success');

            return order;
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    /**
     * Validate customer information
     */
    validateCustomerInfo(info) {
        const required = ['name', 'phone', 'address', 'city'];

        for (const field of required) {
            if (!info[field] || info[field].trim() === '') {
                throw new Error(`Le champ "${this.getFieldLabel(field)}" est requis`);
            }
        }

        // Validate phone number (Moroccan format)
        const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
        if (!phoneRegex.test(info.phone.replace(/\s/g, ''))) {
            throw new Error('Numéro de téléphone invalide');
        }

        // Validate email if provided
        if (info.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(info.email)) {
                throw new Error('Adresse email invalide');
            }
        }
    }

    /**
     * Get field label in French
     */
    getFieldLabel(field) {
        const labels = {
            name: 'Nom',
            phone: 'Téléphone',
            address: 'Adresse',
            city: 'Ville',
            email: 'Email'
        };
        return labels[field] || field;
    }

    /**
     * Simulate payment processing
     */
    async simulatePayment(amount, method) {
        // Simulate payment delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate random success/failure (95% success)
        if (Math.random() < 0.05) {
            throw new Error('Paiement refusé. Veuillez réessayer.');
        }

        return {
            success: true,
            transactionId: 'TXN-' + Date.now(),
            amount,
            method
        };
    }

    /**
     * Get order by ID
     */
    getOrder(orderId) {
        const state = this.store.getState();
        return state.orders.find(order => order.id === orderId);
    }

    /**
     * Get all user orders
     */
    getUserOrders() {
        return this.store.getState().orders;
    }

    /**
     * Track order status
     */
    async trackOrder(orderId) {
        try {
            // In production, fetch from API
            const order = this.getOrder(orderId);

            if (!order) {
                throw new Error('Commande introuvable');
            }

            return order;
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
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
const paymentService = new PaymentService();
window.paymentService = paymentService;
