/* ====================================
   Storage Service Module
   Silya's Parfumerie
   ==================================== */

/**
 * Storage Service for handling localStorage operations
 * Provides a centralized interface for data persistence with error handling
 *
 * Usage:
 *   import { Storage } from './services/storage.js';
 *   Storage.set('cart', cartData);
 *   const cart = Storage.get('cart');
 */

const Storage = {
    // Storage keys
    keys: {
        CART: 'silya-cart',
        WISHLIST: 'silya-wishlist',
        THEME: 'silya-theme',
        LANGUAGE: 'silya-language',
        ORDERS: 'silya-orders',
        USER: 'silya-user',
        RECENT_VIEWS: 'silya-recent-views',
        SEARCH_HISTORY: 'silya-search-history',
        FILTERS: 'silya-filters',
        ADMIN_SESSION: 'silya-admin-session'
    },

    /**
     * Set item in localStorage
     * @param {string} key - Storage key
     * @param {*} value - Value to store (will be JSON stringified)
     * @param {number} expirationDays - Optional expiration in days
     * @returns {boolean} Success status
     */
    set(key, value, expirationDays = null) {
        try {
            const item = {
                value: value,
                timestamp: Date.now(),
                expiration: expirationDays ? Date.now() + (expirationDays * 24 * 60 * 60 * 1000) : null
            };

            localStorage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error(`Storage error (set ${key}):`, error);
            return false;
        }
    },

    /**
     * Get item from localStorage
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    get(key, defaultValue = null) {
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return defaultValue;

            const item = JSON.parse(itemStr);

            // Check expiration
            if (item.expiration && Date.now() > item.expiration) {
                this.remove(key);
                return defaultValue;
            }

            return item.value;
        } catch (error) {
            console.error(`Storage error (get ${key}):`, error);
            return defaultValue;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Storage error (remove ${key}):`, error);
            return false;
        }
    },

    /**
     * Clear all storage
     * @param {boolean} keepUserData - Keep user-related data
     * @returns {boolean} Success status
     */
    clear(keepUserData = false) {
        try {
            if (keepUserData) {
                const userData = {
                    theme: this.get(this.keys.THEME),
                    language: this.get(this.keys.LANGUAGE),
                    user: this.get(this.keys.USER)
                };

                localStorage.clear();

                if (userData.theme) this.set(this.keys.THEME, userData.theme);
                if (userData.language) this.set(this.keys.LANGUAGE, userData.language);
                if (userData.user) this.set(this.keys.USER, userData.user);
            } else {
                localStorage.clear();
            }

            return true;
        } catch (error) {
            console.error('Storage error (clear):', error);
            return false;
        }
    },

    /**
     * Check if key exists
     * @param {string} key - Storage key
     * @returns {boolean} Exists status
     */
    has(key) {
        return localStorage.getItem(key) !== null;
    },

    /**
     * Get storage size in bytes
     * @returns {number} Storage size
     */
    getSize() {
        let size = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                size += localStorage[key].length + key.length;
            }
        }
        return size;
    },

    /**
     * Get storage size in human-readable format
     * @returns {string} Formatted size
     */
    getFormattedSize() {
        const bytes = this.getSize();
        const sizes = ['Bytes', 'KB', 'MB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },

    // Cart-specific methods
    cart: {
        get() {
            return Storage.get(Storage.keys.CART, []);
        },
        set(cart) {
            return Storage.set(Storage.keys.CART, cart, 7); // 7 days expiration
        },
        add(product, quantity = 1) {
            const cart = this.get();
            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ ...product, quantity });
            }

            this.set(cart);
            return cart;
        },
        remove(productId) {
            let cart = this.get();
            cart = cart.filter(item => item.id !== productId);
            this.set(cart);
            return cart;
        },
        update(productId, quantity) {
            const cart = this.get();
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                this.set(cart);
            }
            return cart;
        },
        clear() {
            return Storage.remove(Storage.keys.CART);
        },
        getTotal() {
            const cart = this.get();
            return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        getCount() {
            const cart = this.get();
            return cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    },

    // Wishlist-specific methods
    wishlist: {
        get() {
            return Storage.get(Storage.keys.WISHLIST, []);
        },
        set(wishlist) {
            return Storage.set(Storage.keys.WISHLIST, wishlist);
        },
        add(product) {
            const wishlist = this.get();
            if (!wishlist.find(item => item.id === product.id)) {
                wishlist.push(product);
                this.set(wishlist);
            }
            return wishlist;
        },
        remove(productId) {
            let wishlist = this.get();
            wishlist = wishlist.filter(item => item.id !== productId);
            this.set(wishlist);
            return wishlist;
        },
        has(productId) {
            const wishlist = this.get();
            return wishlist.some(item => item.id === productId);
        },
        toggle(product) {
            if (this.has(product.id)) {
                return this.remove(product.id);
            } else {
                return this.add(product);
            }
        },
        clear() {
            return Storage.remove(Storage.keys.WISHLIST);
        },
        getCount() {
            return this.get().length;
        }
    },

    // Recent views tracking
    recentViews: {
        get() {
            return Storage.get(Storage.keys.RECENT_VIEWS, []);
        },
        add(product, maxItems = 10) {
            let views = this.get();

            // Remove if already exists
            views = views.filter(item => item.id !== product.id);

            // Add to beginning
            views.unshift(product);

            // Limit to maxItems
            if (views.length > maxItems) {
                views = views.slice(0, maxItems);
            }

            Storage.set(Storage.keys.RECENT_VIEWS, views);
            return views;
        },
        clear() {
            return Storage.remove(Storage.keys.RECENT_VIEWS);
        }
    },

    // Search history
    searchHistory: {
        get() {
            return Storage.get(Storage.keys.SEARCH_HISTORY, []);
        },
        add(query, maxItems = 10) {
            if (!query || query.trim() === '') return;

            let history = this.get();

            // Remove if already exists
            history = history.filter(item => item !== query);

            // Add to beginning
            history.unshift(query);

            // Limit to maxItems
            if (history.length > maxItems) {
                history = history.slice(0, maxItems);
            }

            Storage.set(Storage.keys.SEARCH_HISTORY, history);
            return history;
        },
        clear() {
            return Storage.remove(Storage.keys.SEARCH_HISTORY);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Storage };
}
