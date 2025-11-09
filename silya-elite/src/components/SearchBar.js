/**
 * ============================================
 * SearchBar Component - Advanced Search
 * Silya's Elite V3
 * ============================================
 */

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            query: '',
            results: [],
            loading: false,
            recentSearches: []
        };
        this.searchTimeout = null;
    }

    componentDidMount() {
        // Subscribe to store changes
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.setState({
                isOpen: state.ui.searchOpen
            });
        });

        // Load recent searches
        this.loadRecentSearches();

        // Handle Escape key
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe?.();
        document.removeEventListener('keydown', this.handleKeyPress.bind(this));
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Escape' && this.state.isOpen) {
            this.close();
        }
        // Open search with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.open();
        }
    }

    open() {
        store.dispatch({ type: ActionTypes.TOGGLE_SEARCH });
        setTimeout(() => {
            document.querySelector('.search-input')?.focus();
        }, 100);
    }

    close() {
        store.dispatch({ type: ActionTypes.TOGGLE_SEARCH });
        this.setState({ query: '', results: [] });
    }

    handleInput(value) {
        this.setState({ query: value });

        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Debounce search
        if (value.trim().length > 0) {
            this.setState({ loading: true });
            this.searchTimeout = setTimeout(() => {
                this.performSearch(value);
            }, 300);
        } else {
            this.setState({ results: [], loading: false });
        }
    }

    async performSearch(query) {
        try {
            const results = await api.getProducts({ search: query });
            this.setState({
                results: results.slice(0, 8), // Limit to 8 results
                loading: false
            });
        } catch (error) {
            console.error('Search error:', error);
            this.setState({ loading: false });
        }
    }

    selectResult(product) {
        // Save to recent searches
        this.saveRecentSearch(product.name);

        // Navigate to product
        window.location.hash = `#/product/${product.id}`;

        // Close search
        this.close();
    }

    viewAllResults() {
        const { query } = this.state;
        window.location.hash = `#/products?search=${encodeURIComponent(query)}`;
        this.close();
    }

    loadRecentSearches() {
        try {
            const recent = JSON.parse(localStorage.getItem('silya_recent_searches') || '[]');
            this.setState({ recentSearches: recent.slice(0, 5) });
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    }

    saveRecentSearch(query) {
        try {
            let recent = JSON.parse(localStorage.getItem('silya_recent_searches') || '[]');

            // Remove if already exists
            recent = recent.filter(item => item !== query);

            // Add to beginning
            recent.unshift(query);

            // Keep only 10 most recent
            recent = recent.slice(0, 10);

            localStorage.setItem('silya_recent_searches', JSON.stringify(recent));
            this.setState({ recentSearches: recent.slice(0, 5) });
        } catch (error) {
            console.error('Error saving recent search:', error);
        }
    }

    clearRecentSearches() {
        localStorage.removeItem('silya_recent_searches');
        this.setState({ recentSearches: [] });
    }

    render() {
        const { isOpen, query, results, loading, recentSearches } = this.state;

        if (!isOpen) return '';

        return `
            <!-- Search Overlay -->
            <div class="search-overlay ${isOpen ? 'active' : ''}" onclick="searchBarInstance.close()"></div>

            <!-- Search Modal -->
            <div class="search-modal ${isOpen ? 'active' : ''}" data-component="search">
                <div class="search-container">
                    <!-- Search Header -->
                    <div class="search-header">
                        <div class="search-input-wrapper">
                            <i class="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                class="search-input"
                                placeholder="Rechercher des produits, marques..."
                                value="${query}"
                                oninput="searchBarInstance.handleInput(this.value)"
                                autofocus
                            >
                            ${query ? `
                                <button class="search-clear" onclick="searchBarInstance.handleInput('')">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                        </div>
                        <button class="search-close" onclick="searchBarInstance.close()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Search Content -->
                    <div class="search-content">
                        ${this.renderSearchContent(query, results, loading, recentSearches)}
                    </div>

                    <!-- Search Footer -->
                    <div class="search-footer">
                        <div class="search-shortcuts">
                            <kbd>ESC</kbd> pour fermer
                            <kbd>↑</kbd><kbd>↓</kbd> pour naviguer
                            <kbd>↵</kbd> pour sélectionner
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSearchContent(query, results, loading, recentSearches) {
        if (loading) {
            return `
                <div class="search-loading">
                    <div class="spinner"></div>
                    <p>Recherche en cours...</p>
                </div>
            `;
        }

        if (query && results.length === 0) {
            return `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    <h3>Aucun résultat trouvé</h3>
                    <p>Essayez avec d'autres mots-clés</p>
                </div>
            `;
        }

        if (query && results.length > 0) {
            return `
                <div class="search-results">
                    <div class="search-results-header">
                        <span>Résultats (${results.length})</span>
                        <button class="btn-text" onclick="searchBarInstance.viewAllResults()">
                            Voir tout
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                    <div class="search-results-list">
                        ${results.map(product => this.renderSearchResult(product)).join('')}
                    </div>
                </div>
            `;
        }

        // Show recent searches and popular categories
        return `
            ${recentSearches.length > 0 ? `
                <div class="search-section">
                    <div class="search-section-header">
                        <h4>Recherches récentes</h4>
                        <button class="btn-text" onclick="searchBarInstance.clearRecentSearches()">
                            Effacer
                        </button>
                    </div>
                    <div class="recent-searches">
                        ${recentSearches.map(search => `
                            <button class="recent-search-item" onclick="searchBarInstance.handleInput('${search}')">
                                <i class="fas fa-history"></i>
                                <span>${search}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="search-section">
                <div class="search-section-header">
                    <h4>Catégories populaires</h4>
                </div>
                <div class="popular-categories">
                    <a href="#/products?category=parfums" class="category-chip" onclick="searchBarInstance.close()">
                        <i class="fas fa-spray-can-sparkles"></i>
                        Parfums
                    </a>
                    <a href="#/products?category=skincare" class="category-chip" onclick="searchBarInstance.close()">
                        <i class="fas fa-droplet"></i>
                        Soins de la Peau
                    </a>
                    <a href="#/products?category=makeup" class="category-chip" onclick="searchBarInstance.close()">
                        <i class="fas fa-palette"></i>
                        Maquillage
                    </a>
                    <a href="#/products?category=coffrets" class="category-chip" onclick="searchBarInstance.close()">
                        <i class="fas fa-gift"></i>
                        Coffrets Cadeaux
                    </a>
                </div>
            </div>
        `;
    }

    renderSearchResult(product) {
        return `
            <div class="search-result-item" onclick="searchBarInstance.selectResult(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                <div class="result-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="result-info">
                    <h4 class="result-name">${product.name}</h4>
                    ${product.brand ? `<div class="result-brand">${product.brand}</div>` : ''}
                    <div class="result-price">
                        <span class="current">${product.price} MAD</span>
                        ${product.originalPrice ? `<span class="original">${product.originalPrice} MAD</span>` : ''}
                    </div>
                </div>
                <div class="result-badge">
                    ${product.inStock ?
                        '<span class="badge-success">En stock</span>' :
                        '<span class="badge-danger">Rupture</span>'
                    }
                </div>
            </div>
        `;
    }
}

// Create and mount search instance
let searchBarInstance;
document.addEventListener('DOMContentLoaded', () => {
    searchBarInstance = new SearchBar();
    window.searchBarInstance = searchBarInstance;
});
