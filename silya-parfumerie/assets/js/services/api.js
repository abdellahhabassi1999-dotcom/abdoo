/* ====================================
   API Service Module
   Silya's Parfumerie
   ==================================== */

/**
 * API Service for handling all data operations
 * Provides a centralized interface for data fetching, caching, and error handling
 *
 * Usage:
 *   import { API } from './services/api.js';
 *   const products = await API.getProducts();
 */

const API = {
    // Base configuration
    config: {
        baseURL: '/api',
        dataPath: 'assets/data',
        cacheEnabled: true,
        cacheDuration: 3600000, // 1 hour in milliseconds
    },

    // Cache storage
    cache: new Map(),

    /**
     * Fetch products from data source
     * @param {Object} options - Filter and sort options
     * @returns {Promise<Array>} Array of products
     */
    async getProducts(options = {}) {
        const cacheKey = `products_${JSON.stringify(options)}`;

        // Check cache first
        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheDuration) {
                return cached.data;
            }
        }

        try {
            const response = await fetch(`${this.config.dataPath}/products.json`);
            if (!response.ok) throw new Error('Failed to fetch products');

            let products = await response.json();

            // Apply filters if provided
            if (options.category) {
                products = products.filter(p => p.category === options.category);
            }
            if (options.badge) {
                products = products.filter(p => p.badges && p.badges.includes(options.badge));
            }

            // Apply sorting
            if (options.sortBy) {
                products = this.sortProducts(products, options.sortBy);
            }

            // Cache the results
            if (this.config.cacheEnabled) {
                this.cache.set(cacheKey, {
                    data: products,
                    timestamp: Date.now()
                });
            }

            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    /**
     * Fetch a single product by ID
     * @param {string} id - Product ID
     * @returns {Promise<Object>} Product object
     */
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id === id);
            if (!product) throw new Error(`Product not found: ${id}`);
            return product;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    /**
     * Fetch categories
     * @returns {Promise<Array>} Array of categories
     */
    async getCategories() {
        const cacheKey = 'categories';

        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheDuration) {
                return cached.data;
            }
        }

        try {
            const response = await fetch(`${this.config.dataPath}/categories.json`);
            if (!response.ok) throw new Error('Failed to fetch categories');

            const categories = await response.json();

            if (this.config.cacheEnabled) {
                this.cache.set(cacheKey, {
                    data: categories,
                    timestamp: Date.now()
                });
            }

            return categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * Fetch orders
     * @param {string} customerId - Customer ID (optional)
     * @returns {Promise<Array>} Array of orders
     */
    async getOrders(customerId = null) {
        try {
            const response = await fetch(`${this.config.dataPath}/orders.json`);
            if (!response.ok) throw new Error('Failed to fetch orders');

            let orders = await response.json();

            if (customerId) {
                orders = orders.filter(o => o.customer.id === customerId);
            }

            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    /**
     * Fetch customers
     * @returns {Promise<Array>} Array of customers
     */
    async getCustomers() {
        try {
            const response = await fetch(`${this.config.dataPath}/customers.json`);
            if (!response.ok) throw new Error('Failed to fetch customers');
            return await response.json();
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    /**
     * Fetch site settings
     * @returns {Promise<Object>} Settings object
     */
    async getSettings() {
        const cacheKey = 'settings';

        if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.config.cacheDuration) {
                return cached.data;
            }
        }

        try {
            const response = await fetch(`${this.config.dataPath}/settings.json`);
            if (!response.ok) throw new Error('Failed to fetch settings');

            const settings = await response.json();

            if (this.config.cacheEnabled) {
                this.cache.set(cacheKey, {
                    data: settings,
                    timestamp: Date.now()
                });
            }

            return settings;
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    },

    /**
     * Search products
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching products
     */
    async searchProducts(query) {
        try {
            const products = await this.getProducts();
            const searchLower = query.toLowerCase();

            return products.filter(product => {
                const nameMatch = product.name.fr?.toLowerCase().includes(searchLower) ||
                                 product.name.en?.toLowerCase().includes(searchLower) ||
                                 product.name.ar?.includes(query);
                const brandMatch = product.brand?.toLowerCase().includes(searchLower);
                const categoryMatch = product.category?.toLowerCase().includes(searchLower);

                return nameMatch || brandMatch || categoryMatch;
            });
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },

    /**
     * Sort products
     * @param {Array} products - Products array
     * @param {string} sortBy - Sort method
     * @returns {Array} Sorted products
     */
    sortProducts(products, sortBy) {
        const sorted = [...products];

        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.fr.localeCompare(b.name.fr));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.fr.localeCompare(a.name.fr));
            case 'rating-desc':
                return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            default:
                return sorted;
        }
    },

    /**
     * Clear cache
     * @param {string} key - Specific cache key (optional)
     */
    clearCache(key = null) {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API };
}
