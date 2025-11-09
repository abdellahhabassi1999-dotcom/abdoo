/**
 * ============================================
 * Home Page - Landing Page
 * Silya's Elite V3
 * ============================================
 */

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featuredProducts: [],
            newProducts: [],
            categories: [],
            loading: true
        };
    }

    async componentDidMount() {
        await this.loadData();
    }

    async loadData() {
        try {
            this.setState({ loading: true });

            const [featuredProducts, newProducts, categories] = await Promise.all([
                api.getProducts({ featured: true }),
                api.getProducts({ new: true }),
                api.getCategories()
            ]);

            // Dispatch to store
            store.dispatch({
                type: ActionTypes.SET_PRODUCTS,
                payload: await api.getProducts()
            });

            store.dispatch({
                type: ActionTypes.SET_CATEGORIES,
                payload: categories
            });

            this.setState({
                featuredProducts: featuredProducts.slice(0, 6),
                newProducts: newProducts.slice(0, 6),
                categories,
                loading: false
            });
        } catch (error) {
            console.error('Error loading data:', error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { featuredProducts, newProducts, categories, loading } = this.state;

        return `
            <div class="home-page" data-page="home">
                <!-- Hero Section -->
                ${this.renderHero()}

                <!-- Categories Section -->
                <section class="categories-section section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title">Nos Catégories</h2>
                            <p class="section-subtitle">Découvrez notre sélection premium</p>
                        </div>

                        ${loading ? this.renderLoadingSkeleton() : `
                            <div class="categories-grid">
                                ${categories.map(cat => this.renderCategory(cat)).join('')}
                            </div>
                        `}
                    </div>
                </section>

                <!-- Featured Products -->
                <section class="featured-section section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title">Produits en Vedette</h2>
                            <a href="#/products?featured=true" class="btn btn-outline-primary">
                                Voir tout
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>

                        ${loading ? this.renderLoadingSkeleton() : `
                            <div class="products-grid">
                                ${featuredProducts.map(product => this.renderProductCard(product)).join('')}
                            </div>
                        `}
                    </div>
                </section>

                <!-- New Products -->
                <section class="new-products-section section">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title">Nouveautés</h2>
                            <a href="#/products?new=true" class="btn btn-outline-primary">
                                Voir tout
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>

                        ${loading ? this.renderLoadingSkeleton() : `
                            <div class="products-grid">
                                ${newProducts.map(product => this.renderProductCard(product)).join('')}
                            </div>
                        `}
                    </div>
                </section>

                <!-- Features Section -->
                ${this.renderFeatures()}

                <!-- CTA Section -->
                ${this.renderCTA()}
            </div>
        `;
    }

    renderHero() {
        return `
            <section class="hero-section">
                <div class="hero-background">
                    <div class="hero-overlay"></div>
                </div>
                <div class="container hero-container">
                    <div class="hero-content">
                        <h1 class="hero-title">
                            Bienvenue chez
                            <span class="gradient-text">Silya's Elite</span>
                        </h1>
                        <p class="hero-subtitle">
                            Découvrez notre collection exclusive de parfums et cosmétiques de luxe
                        </p>
                        <div class="hero-actions">
                            <a href="#/products" class="btn btn-primary btn-lg">
                                <i class="fas fa-shopping-bag"></i>
                                Découvrir nos produits
                            </a>
                            <a href="#/offers" class="btn btn-outline-white btn-lg">
                                <i class="fas fa-tag"></i>
                                Offres spéciales
                            </a>
                        </div>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <div class="stat-value">500+</div>
                                <div class="stat-label">Produits</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">100+</div>
                                <div class="stat-label">Marques</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">5000+</div>
                                <div class="stat-label">Clients satisfaits</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderCategory(category) {
        return `
            <a href="#/products?category=${category.id}" class="category-card">
                <div class="category-icon">
                    <i class="fas ${category.icon}"></i>
                </div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-count">${category.count} produits</p>
                <div class="category-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </a>
        `;
    }

    renderProductCard(product) {
        // Create product card instance
        const cardId = `product-card-${product.id}`;
        const card = new ProductCard({ product });

        // Store instance
        window.productCardInstances[product.id] = card;

        return card.render();
    }

    renderFeatures() {
        return `
            <section class="features-section section">
                <div class="container">
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-shipping-fast"></i>
                            </div>
                            <h3 class="feature-title">Livraison Rapide</h3>
                            <p class="feature-description">
                                Livraison gratuite pour toute commande supérieure à 500 MAD
                            </p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-shield-check"></i>
                            </div>
                            <h3 class="feature-title">Paiement Sécurisé</h3>
                            <p class="feature-description">
                                Vos transactions sont 100% sécurisées et protégées
                            </p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-award"></i>
                            </div>
                            <h3 class="feature-title">Qualité Garantie</h3>
                            <p class="feature-description">
                                Produits authentiques des meilleures marques mondiales
                            </p>
                        </div>

                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-headset"></i>
                            </div>
                            <h3 class="feature-title">Support 24/7</h3>
                            <p class="feature-description">
                                Notre équipe est à votre disposition via WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderCTA() {
        return `
            <section class="cta-section">
                <div class="container">
                    <div class="cta-content">
                        <h2 class="cta-title">Prêt à commander?</h2>
                        <p class="cta-subtitle">
                            Contactez-nous directement sur WhatsApp pour passer votre commande
                        </p>
                        <a
                            href="https://wa.me/212766985350"
                            target="_blank"
                            class="btn btn-success btn-lg"
                        >
                            <i class="fab fa-whatsapp"></i>
                            Commander sur WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    renderLoadingSkeleton() {
        return `
            <div class="loading-skeleton">
                ${Array(6).fill().map(() => `
                    <div class="skeleton-card">
                        <div class="skeleton-image"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

window.HomePage = HomePage;
