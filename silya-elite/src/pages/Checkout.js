/**
 * ============================================
 * Checkout Page - Order Checkout
 * Silya's Elite V3
 * ============================================
 */

class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1, // 1: Info, 2: Payment, 3: Confirmation
            cartItems: [],
            totals: {},
            formData: {
                name: '',
                phone: '',
                email: '',
                address: '',
                city: 'Kénitra',
                notes: ''
            },
            paymentMethod: 'whatsapp',
            processing: false,
            errors: {},
            order: null
        };
    }

    componentDidMount() {
        // Get cart data
        const state = store.getState();
        const cartItems = state.cart.items;

        // Redirect if cart is empty
        if (cartItems.length === 0 && this.state.step !== 3) {
            window.location.hash = '#/products';
            return;
        }

        this.setState({
            cartItems,
            totals: {
                subtotal: state.cart.subtotal,
                tax: state.cart.tax,
                shipping: state.cart.shipping,
                discount: state.cart.discount,
                total: state.cart.total
            }
        });

        // Subscribe to store
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.setState({
                cartItems: state.cart.items,
                totals: {
                    subtotal: state.cart.subtotal,
                    tax: state.cart.tax,
                    shipping: state.cart.shipping,
                    discount: state.cart.discount,
                    total: state.cart.total
                }
            });
        });

        // Load user data if authenticated
        if (state.isAuthenticated && state.user) {
            this.setState({
                formData: {
                    ...this.state.formData,
                    name: state.user.name || '',
                    phone: state.user.phone || '',
                    email: state.user.email || ''
                }
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe?.();
    }

    handleInputChange(field, value) {
        this.setState({
            formData: {
                ...this.state.formData,
                [field]: value
            },
            errors: {
                ...this.state.errors,
                [field]: null
            }
        });
    }

    validateForm() {
        const { formData } = this.state;
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Le nom est requis';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Le téléphone est requis';
        } else if (!/^(\+212|0)[5-7]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
            errors.phone = 'Numéro de téléphone invalide';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Email invalide';
        }

        if (!formData.address.trim()) {
            errors.address = 'L\'adresse est requise';
        }

        if (!formData.city.trim()) {
            errors.city = 'La ville est requise';
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    async submitOrder() {
        if (!this.validateForm()) {
            return;
        }

        this.setState({ processing: true });

        try {
            const { formData, paymentMethod, cartItems, totals } = this.state;

            let order;

            if (paymentMethod === 'whatsapp') {
                order = await paymentService.processWhatsAppOrder(formData);
            } else if (paymentMethod === 'cod') {
                order = await paymentService.processCashOnDelivery(formData);
            } else {
                order = await paymentService.processOnlinePayment(formData, paymentMethod);
            }

            this.setState({
                step: 3,
                order,
                processing: false
            });
        } catch (error) {
            console.error('Order submission error:', error);
            this.setState({ processing: false });
        }
    }

    render() {
        const { step, cartItems, totals, formData, paymentMethod, processing, errors, order } = this.state;

        return `
            <div class="checkout-page" data-page="checkout">
                <div class="container">
                    <!-- Progress Steps -->
                    <div class="checkout-steps">
                        <div class="step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}">
                            <div class="step-number">1</div>
                            <div class="step-label">Informations</div>
                        </div>
                        <div class="step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}">
                            <div class="step-number">2</div>
                            <div class="step-label">Paiement</div>
                        </div>
                        <div class="step ${step >= 3 ? 'active' : ''}">
                            <div class="step-number">3</div>
                            <div class="step-label">Confirmation</div>
                        </div>
                    </div>

                    <!-- Checkout Content -->
                    <div class="checkout-content">
                        ${step === 1 ? this.renderStepInfo() : ''}
                        ${step === 2 ? this.renderStepPayment() : ''}
                        ${step === 3 ? this.renderStepConfirmation() : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderStepInfo() {
        const { formData, errors, cartItems, totals } = this.state;

        return `
            <div class="checkout-grid">
                <!-- Customer Information Form -->
                <div class="checkout-form">
                    <h2 class="form-title">Informations de livraison</h2>

                    <div class="form-group">
                        <label for="name">Nom complet *</label>
                        <input
                            type="text"
                            id="name"
                            class="form-control ${errors.name ? 'error' : ''}"
                            value="${formData.name}"
                            oninput="checkoutInstance.handleInputChange('name', this.value)"
                            placeholder="Votre nom complet"
                        >
                        ${errors.name ? `<span class="error-message">${errors.name}</span>` : ''}
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="phone">Téléphone *</label>
                            <input
                                type="tel"
                                id="phone"
                                class="form-control ${errors.phone ? 'error' : ''}"
                                value="${formData.phone}"
                                oninput="checkoutInstance.handleInputChange('phone', this.value)"
                                placeholder="+212 6XX XXX XXX"
                            >
                            ${errors.phone ? `<span class="error-message">${errors.phone}</span>` : ''}
                        </div>

                        <div class="form-group">
                            <label for="email">Email (optionnel)</label>
                            <input
                                type="email"
                                id="email"
                                class="form-control ${errors.email ? 'error' : ''}"
                                value="${formData.email}"
                                oninput="checkoutInstance.handleInputChange('email', this.value)"
                                placeholder="votre@email.com"
                            >
                            ${errors.email ? `<span class="error-message">${errors.email}</span>` : ''}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="address">Adresse complète *</label>
                        <textarea
                            id="address"
                            class="form-control ${errors.address ? 'error' : ''}"
                            rows="3"
                            oninput="checkoutInstance.handleInputChange('address', this.value)"
                            placeholder="Numéro, rue, quartier..."
                        >${formData.address}</textarea>
                        ${errors.address ? `<span class="error-message">${errors.address}</span>` : ''}
                    </div>

                    <div class="form-group">
                        <label for="city">Ville *</label>
                        <select
                            id="city"
                            class="form-control ${errors.city ? 'error' : ''}"
                            onchange="checkoutInstance.handleInputChange('city', this.value)"
                        >
                            <option value="Kénitra" ${formData.city === 'Kénitra' ? 'selected' : ''}>Kénitra</option>
                            <option value="Rabat" ${formData.city === 'Rabat' ? 'selected' : ''}>Rabat</option>
                            <option value="Casablanca" ${formData.city === 'Casablanca' ? 'selected' : ''}>Casablanca</option>
                            <option value="Salé" ${formData.city === 'Salé' ? 'selected' : ''}>Salé</option>
                            <option value="Autre" ${formData.city === 'Autre' ? 'selected' : ''}>Autre</option>
                        </select>
                        ${errors.city ? `<span class="error-message">${errors.city}</span>` : ''}
                    </div>

                    <div class="form-group">
                        <label for="notes">Notes (optionnel)</label>
                        <textarea
                            id="notes"
                            class="form-control"
                            rows="3"
                            oninput="checkoutInstance.handleInputChange('notes', this.value)"
                            placeholder="Instructions spéciales..."
                        >${formData.notes}</textarea>
                    </div>

                    <button
                        class="btn btn-primary btn-lg btn-block"
                        onclick="checkoutInstance.setState({ step: 2 })"
                    >
                        Continuer
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>

                <!-- Order Summary -->
                ${this.renderOrderSummary(cartItems, totals)}
            </div>
        `;
    }

    renderStepPayment() {
        const { paymentMethod, processing } = this.state;

        return `
            <div class="checkout-grid">
                <!-- Payment Methods -->
                <div class="payment-methods">
                    <h2 class="form-title">Mode de paiement</h2>

                    <!-- WhatsApp -->
                    <label class="payment-option ${paymentMethod === 'whatsapp' ? 'active' : ''}">
                        <input
                            type="radio"
                            name="payment"
                            value="whatsapp"
                            ${paymentMethod === 'whatsapp' ? 'checked' : ''}
                            onchange="checkoutInstance.setState({ paymentMethod: 'whatsapp' })"
                        >
                        <div class="payment-option-content">
                            <i class="fab fa-whatsapp payment-icon"></i>
                            <div class="payment-details">
                                <h3>Commander via WhatsApp</h3>
                                <p>Commande directe via notre numéro WhatsApp</p>
                            </div>
                        </div>
                    </label>

                    <!-- Cash on Delivery -->
                    <label class="payment-option ${paymentMethod === 'cod' ? 'active' : ''}">
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            ${paymentMethod === 'cod' ? 'checked' : ''}
                            onchange="checkoutInstance.setState({ paymentMethod: 'cod' })"
                        >
                        <div class="payment-option-content">
                            <i class="fas fa-money-bill-wave payment-icon"></i>
                            <div class="payment-details">
                                <h3>Paiement à la livraison</h3>
                                <p>Payez en espèces lors de la réception</p>
                            </div>
                        </div>
                    </label>

                    <!-- Online Payment -->
                    <label class="payment-option ${paymentMethod === 'stripe' ? 'active' : ''} disabled">
                        <input
                            type="radio"
                            name="payment"
                            value="stripe"
                            disabled
                        >
                        <div class="payment-option-content">
                            <i class="fas fa-credit-card payment-icon"></i>
                            <div class="payment-details">
                                <h3>Carte bancaire</h3>
                                <p>Bientôt disponible</p>
                            </div>
                        </div>
                    </label>

                    <!-- Action Buttons -->
                    <div class="checkout-actions">
                        <button
                            class="btn btn-outline-primary btn-lg"
                            onclick="checkoutInstance.setState({ step: 1 })"
                        >
                            <i class="fas fa-arrow-left"></i>
                            Retour
                        </button>
                        <button
                            class="btn btn-primary btn-lg"
                            onclick="checkoutInstance.submitOrder()"
                            ${processing ? 'disabled' : ''}
                        >
                            ${processing ? `
                                <span class="spinner-small"></span>
                                Traitement...
                            ` : `
                                Confirmer la commande
                                <i class="fas fa-check"></i>
                            `}
                        </button>
                    </div>
                </div>

                <!-- Order Summary -->
                ${this.renderOrderSummary(this.state.cartItems, this.state.totals)}
            </div>
        `;
    }

    renderStepConfirmation() {
        const { order } = this.state;

        return `
            <div class="checkout-confirmation">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h1 class="confirmation-title">Commande confirmée!</h1>
                <p class="confirmation-message">
                    Merci pour votre commande. Nous vous contacterons bientôt pour confirmer les détails.
                </p>

                ${order ? `
                    <div class="order-details">
                        <div class="order-number">
                            Numéro de commande: <strong>${order.id}</strong>
                        </div>
                        <div class="order-info">
                            <p>Un récapitulatif a été envoyé à ${order.customer.phone}</p>
                            <p>Livraison estimée: 2-3 jours ouvrables</p>
                        </div>
                    </div>
                ` : ''}

                <div class="confirmation-actions">
                    <a href="#/" class="btn btn-primary btn-lg">
                        <i class="fas fa-home"></i>
                        Retour à l'accueil
                    </a>
                    <a href="#/products" class="btn btn-outline-primary btn-lg">
                        <i class="fas fa-shopping-bag"></i>
                        Continuer les achats
                    </a>
                </div>
            </div>
        `;
    }

    renderOrderSummary(items, totals) {
        return `
            <div class="order-summary">
                <h3 class="summary-title">Récapitulatif</h3>

                <!-- Items -->
                <div class="summary-items">
                    ${items.map(item => `
                        <div class="summary-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>Quantité: ${item.quantity}</p>
                            </div>
                            <div class="item-price">
                                ${(item.price * item.quantity).toFixed(2)} MAD
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Totals -->
                <div class="summary-totals">
                    <div class="total-row">
                        <span>Sous-total</span>
                        <span>${totals.subtotal?.toFixed(2)} MAD</span>
                    </div>
                    <div class="total-row">
                        <span>TVA (20%)</span>
                        <span>${totals.tax?.toFixed(2)} MAD</span>
                    </div>
                    <div class="total-row">
                        <span>Livraison</span>
                        <span>${totals.shipping === 0 ? 'GRATUITE' : totals.shipping?.toFixed(2) + ' MAD'}</span>
                    </div>
                    ${totals.discount > 0 ? `
                        <div class="total-row discount">
                            <span>Réduction</span>
                            <span>-${totals.discount?.toFixed(2)} MAD</span>
                        </div>
                    ` : ''}
                    <div class="total-row total-main">
                        <span>Total</span>
                        <span class="total-amount">${totals.total?.toFixed(2)} MAD</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Create instance
let checkoutInstance;
window.CheckoutPage = CheckoutPage;
