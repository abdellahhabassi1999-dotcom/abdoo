/**
 * ============================================
 * Header Component - Main Navigation
 * Silya's Elite V3
 * ============================================
 */

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartCount: 0,
            isScrolled: false,
            mobileMenuOpen: false
        };
    }

    componentDidMount() {
        // Subscribe to store changes
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            const cartCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

            this.setState({
                cartCount,
                mobileMenuOpen: state.ui.mobileMenuOpen
            });
        });

        // Handle scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Initial cart count
        this.updateCartCount();
    }

    componentWillUnmount() {
        this.unsubscribe?.();
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const isScrolled = window.scrollY > 50;
        if (this.state.isScrolled !== isScrolled) {
            this.setState({ isScrolled });
        }
    }

    updateCartCount() {
        const state = store.getState();
        const cartCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
        this.setState({ cartCount });
    }

    toggleMobileMenu() {
        store.dispatch({ type: ActionTypes.TOGGLE_MOBILE_MENU });
    }

    toggleCart() {
        cartService.toggleCart();
    }

    toggleSearch() {
        store.dispatch({ type: ActionTypes.TOGGLE_SEARCH });
    }

    navigateTo(hash) {
        window.location.hash = hash;
        if (this.state.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    render() {
        const { cartCount, isScrolled, mobileMenuOpen } = this.state;

        return `
            <header class="header ${isScrolled ? 'scrolled' : ''}" data-component="header">
                <div class="container header-container">
                    <!-- Logo -->
                    <div class="header-logo" onclick="window.location.hash='#/'">
                        <i class="fas fa-spray-can-sparkles"></i>
                        <span class="logo-text">Silya's Elite</span>
                    </div>

                    <!-- Desktop Navigation -->
                    <nav class="header-nav desktop-nav">
                        <a href="#/" class="nav-link ${window.location.hash === '#/' || !window.location.hash ? 'active' : ''}">
                            <i class="fas fa-home"></i>
                            <span>Accueil</span>
                        </a>
                        <a href="#/products" class="nav-link ${window.location.hash.includes('#/products') ? 'active' : ''}">
                            <i class="fas fa-shopping-bag"></i>
                            <span>Produits</span>
                        </a>
                        <a href="#/categories" class="nav-link">
                            <i class="fas fa-th-large"></i>
                            <span>Catégories</span>
                        </a>
                        <a href="#/offers" class="nav-link">
                            <i class="fas fa-tag"></i>
                            <span>Offres</span>
                        </a>
                    </nav>

                    <!-- Header Actions -->
                    <div class="header-actions">
                        <!-- Search -->
                        <button class="header-icon-btn" onclick="headerInstance.toggleSearch()" title="Rechercher">
                            <i class="fas fa-search"></i>
                        </button>

                        <!-- Wishlist -->
                        <button class="header-icon-btn" onclick="window.location.hash='#/wishlist'" title="Liste de souhaits">
                            <i class="fas fa-heart"></i>
                        </button>

                        <!-- Cart -->
                        <button class="header-icon-btn cart-btn" onclick="headerInstance.toggleCart()" title="Panier">
                            <i class="fas fa-shopping-cart"></i>
                            ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
                        </button>

                        <!-- User -->
                        <button class="header-icon-btn" onclick="window.location.hash='#/account'" title="Mon compte">
                            <i class="fas fa-user"></i>
                        </button>

                        <!-- Mobile Menu Toggle -->
                        <button class="header-icon-btn mobile-menu-toggle" onclick="headerInstance.toggleMobileMenu()">
                            <i class="fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}"></i>
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <nav class="mobile-nav ${mobileMenuOpen ? 'active' : ''}">
                    <a href="#/" class="mobile-nav-link" onclick="headerInstance.navigateTo('#/')">
                        <i class="fas fa-home"></i>
                        <span>Accueil</span>
                    </a>
                    <a href="#/products" class="mobile-nav-link" onclick="headerInstance.navigateTo('#/products')">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Produits</span>
                    </a>
                    <a href="#/categories" class="mobile-nav-link" onclick="headerInstance.navigateTo('#/categories')">
                        <i class="fas fa-th-large"></i>
                        <span>Catégories</span>
                    </a>
                    <a href="#/offers" class="mobile-nav-link" onclick="headerInstance.navigateTo('#/offers')">
                        <i class="fas fa-tag"></i>
                        <span>Offres</span>
                    </a>
                    <a href="#/wishlist" class="mobile-nav-link" onclick="headerInstance.navigateTo('#/wishlist')">
                        <i class="fas fa-heart"></i>
                        <span>Liste de souhaits</span>
                    </a>
                    <a href="#/account" class="mobile-nav-link" onclick="headerInstance.navigateTo('#/account')">
                        <i class="fas fa-user"></i>
                        <span>Mon compte</span>
                    </a>
                </nav>
            </header>
        `;
    }
}

// Create and mount header instance
let headerInstance;
document.addEventListener('DOMContentLoaded', () => {
    headerInstance = new Header();
    window.headerInstance = headerInstance;
});
