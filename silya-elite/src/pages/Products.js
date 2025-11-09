/**
 * ============================================
 * Products Page - Product Listing
 * Silya's Elite V3
 * ============================================
 */

class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: [],
            categories: [],
            selectedCategory: 'all',
            sortBy: 'featured',
            searchQuery: '',
            loading: true,
            viewMode: 'grid' // 'grid' or 'list'
        };
    }

    async componentDidMount() {
        await this.loadData();
        this.parseURLParams();

        // Subscribe to store
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.setState({
                filteredProducts: state.filteredProducts
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe?.();
    }

    async loadData() {
        try {
            this.setState({ loading: true });

            const [products, categories] = await Promise.all([
                api.getProducts(),
                api.getCategories()
            ]);

            store.dispatch({
                type: ActionTypes.SET_PRODUCTS,
                payload: products
            });

            store.dispatch({
                type: ActionTypes.SET_CATEGORIES,
                payload: categories
            });

            this.setState({
                products,
                filteredProducts: products,
                categories,
                loading: false
            });
        } catch (error) {
            console.error('Error loading products:', error);
            this.setState({ loading: false });
        }
    }

    parseURLParams() {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const category = params.get('category') || 'all';
        const search = params.get('search') || '';

        if (category !== 'all' || search) {
            this.filterProducts(category, search);
        }
    }

    filterProducts(category, search = '') {
        store.dispatch({
            type: ActionTypes.FILTER_PRODUCTS,
            payload: { category, search }
        });

        this.setState({
            selectedCategory: category,
            searchQuery: search
        });
    }

    sortProducts(sortBy) {
        store.dispatch({
            type: ActionTypes.SORT_PRODUCTS,
            payload: sortBy
        });

        this.setState({ sortBy });
    }

    toggleViewMode() {
        this.setState({
            viewMode: this.state.viewMode === 'grid' ? 'list' : 'grid'
        });
    }

    render() {
        const { filteredProducts, categories, selectedCategory, sortBy, loading, viewMode } = this.state;

        return `
            <div class="products-page" data-page="products">
                <div class="container">
                    <!-- Page Header -->
                    <div class="page-header">
                        <h1 class="page-title">Nos Produits</h1>
                        <p class="page-subtitle">Découvrez notre collection complète</p>
                    </div>

                    <!-- Filters & Sort Bar -->
                    <div class="products-toolbar">
                        <!-- Categories Filter -->
                        <div class="categories-filter">
                            <button
                                class="filter-btn ${selectedCategory === 'all' ? 'active' : ''}"
                                onclick="productsPageInstance.filterProducts('all')"
                            >
                                Tout
                            </button>
                            ${categories.map(cat => `
                                <button
                                    class="filter-btn ${selectedCategory === cat.id ? 'active' : ''}"
                                    onclick="productsPageInstance.filterProducts('${cat.id}')"
                                >
                                    <i class="fas ${cat.icon}"></i>
                                    ${cat.name}
                                </button>
                            `).join('')}
                        </div>

                        <!-- Sort & View Controls -->
                        <div class="products-controls">
                            <!-- Sort Dropdown -->
                            <select
                                class="sort-select"
                                value="${sortBy}"
                                onchange="productsPageInstance.sortProducts(this.value)"
                            >
                                <option value="featured">En vedette</option>
                                <option value="newest">Plus récent</option>
                                <option value="price_asc">Prix croissant</option>
                                <option value="price_desc">Prix décroissant</option>
                                <option value="name_asc">Nom A-Z</option>
                                <option value="name_desc">Nom Z-A</option>
                            </select>

                            <!-- View Mode Toggle -->
                            <div class="view-toggle">
                                <button
                                    class="view-btn ${viewMode === 'grid' ? 'active' : ''}"
                                    onclick="productsPageInstance.toggleViewMode()"
                                    title="Vue grille"
                                >
                                    <i class="fas fa-th"></i>
                                </button>
                                <button
                                    class="view-btn ${viewMode === 'list' ? 'active' : ''}"
                                    onclick="productsPageInstance.toggleViewMode()"
                                    title="Vue liste"
                                >
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Products Count -->
                    <div class="products-count">
                        ${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''} trouvé${filteredProducts.length > 1 ? 's' : ''}
                    </div>

                    <!-- Products Grid/List -->
                    ${loading ? this.renderLoadingSkeleton() : `
                        <div class="products-grid ${viewMode}">
                            ${filteredProducts.length > 0 ?
                                filteredProducts.map(product => this.renderProductCard(product)).join('') :
                                this.renderEmptyState()
                            }
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    renderProductCard(product) {
        const card = new ProductCard({ product });
        window.productCardInstances[product.id] = card;
        return card.render();
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Aucun produit trouvé</h3>
                <p>Essayez de modifier vos filtres ou votre recherche</p>
                <button class="btn btn-primary" onclick="productsPageInstance.filterProducts('all')">
                    <i class="fas fa-redo"></i>
                    Réinitialiser les filtres
                </button>
            </div>
        `;
    }

    renderLoadingSkeleton() {
        return `
            <div class="loading-skeleton">
                ${Array(12).fill().map(() => `
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

// Create instance
let productsPageInstance;
window.ProductsPage = ProductsPage;
