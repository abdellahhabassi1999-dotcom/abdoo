/**
 * ============================================
 * Main Application Entry Point
 * Silya's Elite V3
 * ============================================
 */

class App {
    constructor() {
        this.currentPage = null;
        this.router = window.router;
        this.store = window.store;

        this.initializeApp();
    }

    /**
     * Initialize the application
     */
    async initializeApp() {
        console.log('🚀 Initializing Silya\'s Elite V3...');

        // Setup router
        this.setupRouter();

        // Initialize components
        this.initializeComponents();

        // Setup theme
        this.initializeTheme();

        // Setup event listeners
        this.setupEventListeners();

        // Start router
        this.router.start();

        console.log('✅ Application initialized successfully');
    }

    /**
     * Setup router with all routes
     */
    setupRouter() {
        // Home page
        this.router.addRoute('/', () => {
            this.renderPage(HomePage);
        });

        // Products page
        this.router.addRoute('/products', () => {
            this.renderPage(ProductsPage);
            if (window.productsPageInstance) {
                window.productsPageInstance = null;
            }
            window.productsPageInstance = new ProductsPage();
        });

        // Product detail page
        this.router.addRoute('/product/:id', (params) => {
            this.renderPage(ProductDetailPage);
            if (window.productDetailInstance) {
                window.productDetailInstance = null;
            }
            window.productDetailInstance = new ProductDetailPage({ productId: params.id });
        });

        // Checkout page
        this.router.addRoute('/checkout', () => {
            this.renderPage(CheckoutPage);
            if (window.checkoutInstance) {
                window.checkoutInstance = null;
            }
            window.checkoutInstance = new CheckoutPage();
        });

        // Categories page
        this.router.addRoute('/categories', () => {
            this.renderPage(ProductsPage);
        });

        // Offers page
        this.router.addRoute('/offers', () => {
            this.renderPage(ProductsPage);
        });

        // Wishlist page
        this.router.addRoute('/wishlist', () => {
            this.renderWishlistPage();
        });

        // Account page
        this.router.addRoute('/account', () => {
            this.renderAccountPage();
        });

        // 404 Not Found
        this.router.setNotFoundHandler(() => {
            this.render404();
        });
    }

    /**
     * Initialize global components (Header, Cart, Search)
     */
    initializeComponents() {
        const appContainer = document.getElementById('app');

        // Create header
        if (!window.headerInstance) {
            window.headerInstance = new Header();
        }

        // Create cart
        if (!window.cartInstance) {
            window.cartInstance = new Cart();
        }

        // Create search
        if (!window.searchBarInstance) {
            window.searchBarInstance = new SearchBar();
        }

        // Render global components
        this.renderGlobalComponents();
    }

    /**
     * Render global components (Header, Cart, Search, Notification)
     */
    renderGlobalComponents() {
        const appContainer = document.getElementById('app');

        // Update header
        const existingHeader = document.querySelector('[data-component="header"]');
        if (existingHeader) {
            existingHeader.outerHTML = window.headerInstance.render();
        } else {
            const headerHTML = window.headerInstance.render();
            appContainer.insertAdjacentHTML('afterbegin', headerHTML);
        }

        // Update cart
        const existingCart = document.querySelector('[data-component="cart"]');
        const cartHTML = window.cartInstance.render();
        if (existingCart) {
            existingCart.parentElement.outerHTML = cartHTML;
        } else {
            appContainer.insertAdjacentHTML('beforeend', cartHTML);
        }

        // Update search
        const existingSearch = document.querySelector('[data-component="search"]');
        const searchHTML = window.searchBarInstance.render();
        if (existingSearch) {
            existingSearch.parentElement.outerHTML = searchHTML;
        } else {
            appContainer.insertAdjacentHTML('beforeend', searchHTML);
        }

        // Add notification container
        if (!document.querySelector('.notification-container')) {
            appContainer.insertAdjacentHTML('beforeend', '<div class="notification-container"></div>');
        }
    }

    /**
     * Initialize theme
     */
    initializeTheme() {
        const savedTheme = localStorage.getItem('silya_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        this.store.dispatch({
            type: ActionTypes.SET_THEME,
            payload: savedTheme
        });
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Subscribe to store for notifications
        this.store.subscribe(() => {
            const state = this.store.getState();

            // Handle notifications
            if (state.ui.notification.show) {
                this.showNotification(state.ui.notification.message, state.ui.notification.type);
            }

            // Re-render global components on state change
            this.renderGlobalComponents();
        });

        // Handle hash change
        window.addEventListener('hashchange', () => {
            this.renderGlobalComponents();
        });
    }

    /**
     * Render a page component
     */
    renderPage(PageClass) {
        const appContainer = document.getElementById('app');
        const mainContent = document.querySelector('.main-content') || this.createMainContent();

        // Unmount previous page
        if (this.currentPage && this.currentPage.componentWillUnmount) {
            this.currentPage.componentWillUnmount();
        }

        // Create new page instance
        this.currentPage = new PageClass();

        // Render page
        mainContent.innerHTML = this.currentPage.render();

        // Call componentDidMount
        if (this.currentPage.componentDidMount) {
            this.currentPage.componentDidMount();
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Create main content container if it doesn't exist
     */
    createMainContent() {
        const appContainer = document.getElementById('app');
        let mainContent = document.querySelector('.main-content');

        if (!mainContent) {
            mainContent = document.createElement('div');
            mainContent.className = 'main-content';
            appContainer.appendChild(mainContent);
        }

        return mainContent;
    }

    /**
     * Render wishlist page
     */
    renderWishlistPage() {
        const mainContent = this.createMainContent();
        const state = this.store.getState();
        const wishlist = state.wishlist;

        mainContent.innerHTML = `
            <div class="wishlist-page" data-page="wishlist">
                <div class="container">
                    <div class="page-header">
                        <h1 class="page-title">Ma Liste de Souhaits</h1>
                        <p class="page-subtitle">${wishlist.length} produit${wishlist.length > 1 ? 's' : ''}</p>
                    </div>

                    ${wishlist.length === 0 ? `
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h3>Votre liste de souhaits est vide</h3>
                            <p>Ajoutez vos produits favoris pour les retrouver facilement</p>
                            <a href="#/products" class="btn btn-primary">
                                <i class="fas fa-shopping-bag"></i>
                                Découvrir nos produits
                            </a>
                        </div>
                    ` : `
                        <div class="products-grid">
                            ${wishlist.map(product => {
                                const card = new ProductCard({ product });
                                window.productCardInstances[product.id] = card;
                                return card.render();
                            }).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;

        window.scrollTo(0, 0);
    }

    /**
     * Render account page
     */
    renderAccountPage() {
        const mainContent = this.createMainContent();
        const state = this.store.getState();
        const isAuthenticated = state.isAuthenticated;
        const user = state.user;

        mainContent.innerHTML = `
            <div class="account-page" data-page="account">
                <div class="container">
                    <div class="page-header">
                        <h1 class="page-title">Mon Compte</h1>
                    </div>

                    ${!isAuthenticated ? `
                        <div class="auth-container">
                            <div class="auth-card">
                                <h2>Connexion</h2>
                                <p>Connectez-vous pour accéder à votre compte</p>
                                <button class="btn btn-primary btn-block" onclick="alert('Fonctionnalité bientôt disponible')">
                                    <i class="fas fa-sign-in-alt"></i>
                                    Se connecter
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div class="account-info">
                            <h2>Bienvenue, ${user.name}!</h2>
                            <p>${user.email}</p>
                            <button class="btn btn-outline-primary" onclick="window.authService.logout()">
                                <i class="fas fa-sign-out-alt"></i>
                                Déconnexion
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;

        window.scrollTo(0, 0);
    }

    /**
     * Render 404 page
     */
    render404() {
        const mainContent = this.createMainContent();

        mainContent.innerHTML = `
            <div class="not-found-page">
                <div class="container">
                    <div class="not-found-content">
                        <h1 class="error-code">404</h1>
                        <h2 class="error-title">Page non trouvée</h2>
                        <p class="error-message">
                            La page que vous recherchez n'existe pas ou a été déplacée.
                        </p>
                        <a href="#/" class="btn btn-primary btn-lg">
                            <i class="fas fa-home"></i>
                            Retour à l'accueil
                        </a>
                    </div>
                </div>
            </div>
        `;

        window.scrollTo(0, 0);
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const container = document.querySelector('.notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const icon = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        }[type] || 'fa-info-circle';

        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
