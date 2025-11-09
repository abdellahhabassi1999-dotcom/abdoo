/* ====================================
   Analytics Service Module
   Silya's Parfumerie
   ==================================== */

/**
 * Analytics Service for tracking user interactions and events
 * Provides integration with Google Analytics, Facebook Pixel, and custom tracking
 *
 * Usage:
 *   import { Analytics } from './services/analytics.js';
 *   Analytics.trackEvent('product_view', { product_id: '123' });
 */

const Analytics = {
    // Configuration
    config: {
        enabled: false, // Enable/disable all tracking
        debug: false, // Log events to console
        providers: {
            googleAnalytics: {
                enabled: false,
                trackingId: '', // GA4 Measurement ID
            },
            facebookPixel: {
                enabled: false,
                pixelId: '',
            },
            customAnalytics: {
                enabled: true, // Local analytics
                storageKey: 'silya-analytics'
            }
        }
    },

    /**
     * Initialize analytics services
     */
    init() {
        if (!this.config.enabled) return;

        // Initialize Google Analytics
        if (this.config.providers.googleAnalytics.enabled) {
            this.initGoogleAnalytics();
        }

        // Initialize Facebook Pixel
        if (this.config.providers.facebookPixel.enabled) {
            this.initFacebookPixel();
        }

        // Track page view
        this.trackPageView();
    },

    /**
     * Initialize Google Analytics 4
     */
    initGoogleAnalytics() {
        const trackingId = this.config.providers.googleAnalytics.trackingId;
        if (!trackingId) return;

        // Load GA4 script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', trackingId);

        if (this.config.debug) {
            console.log('Google Analytics initialized:', trackingId);
        }
    },

    /**
     * Initialize Facebook Pixel
     */
    initFacebookPixel() {
        const pixelId = this.config.providers.facebookPixel.pixelId;
        if (!pixelId) return;

        // Load Facebook Pixel script
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', pixelId);
        fbq('track', 'PageView');

        if (this.config.debug) {
            console.log('Facebook Pixel initialized:', pixelId);
        }
    },

    /**
     * Track page view
     */
    trackPageView() {
        const data = {
            page_path: window.location.pathname,
            page_title: document.title,
            page_location: window.location.href
        };

        this.trackEvent('page_view', data);
    },

    /**
     * Track custom event
     * @param {string} eventName - Event name
     * @param {Object} eventData - Event data
     */
    trackEvent(eventName, eventData = {}) {
        if (!this.config.enabled) return;

        const event = {
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };

        // Debug logging
        if (this.config.debug) {
            console.log('Analytics Event:', event);
        }

        // Google Analytics
        if (this.config.providers.googleAnalytics.enabled && typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }

        // Facebook Pixel
        if (this.config.providers.facebookPixel.enabled && typeof fbq !== 'undefined') {
            fbq('track', this.mapEventToFacebookPixel(eventName), eventData);
        }

        // Custom analytics (store locally)
        if (this.config.providers.customAnalytics.enabled) {
            this.storeEvent(event);
        }
    },

    /**
     * Track product view
     * @param {Object} product - Product data
     */
    trackProductView(product) {
        this.trackEvent('view_item', {
            items: [{
                item_id: product.id,
                item_name: product.name.fr || product.name,
                item_brand: product.brand,
                item_category: product.category,
                price: product.price
            }]
        });
    },

    /**
     * Track add to cart
     * @param {Object} product - Product data
     * @param {number} quantity - Quantity added
     */
    trackAddToCart(product, quantity = 1) {
        this.trackEvent('add_to_cart', {
            currency: 'MAD',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name.fr || product.name,
                item_brand: product.brand,
                item_category: product.category,
                price: product.price,
                quantity: quantity
            }]
        });
    },

    /**
     * Track remove from cart
     * @param {Object} product - Product data
     */
    trackRemoveFromCart(product) {
        this.trackEvent('remove_from_cart', {
            items: [{
                item_id: product.id,
                item_name: product.name.fr || product.name,
                price: product.price
            }]
        });
    },

    /**
     * Track wishlist add
     * @param {Object} product - Product data
     */
    trackAddToWishlist(product) {
        this.trackEvent('add_to_wishlist', {
            items: [{
                item_id: product.id,
                item_name: product.name.fr || product.name,
                item_brand: product.brand,
                price: product.price
            }]
        });
    },

    /**
     * Track search
     * @param {string} query - Search query
     * @param {number} results - Number of results
     */
    trackSearch(query, results = 0) {
        this.trackEvent('search', {
            search_term: query,
            results_count: results
        });
    },

    /**
     * Track checkout begin
     * @param {Array} items - Cart items
     * @param {number} total - Order total
     */
    trackBeginCheckout(items, total) {
        this.trackEvent('begin_checkout', {
            currency: 'MAD',
            value: total,
            items: items.map(item => ({
                item_id: item.id,
                item_name: item.name.fr || item.name,
                item_brand: item.brand,
                price: item.price,
                quantity: item.quantity
            }))
        });
    },

    /**
     * Track purchase
     * @param {Object} order - Order data
     */
    trackPurchase(order) {
        this.trackEvent('purchase', {
            transaction_id: order.id,
            currency: 'MAD',
            value: order.totals.total,
            shipping: order.totals.shipping,
            tax: 0,
            items: order.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        });
    },

    /**
     * Map event names to Facebook Pixel standard events
     */
    mapEventToFacebookPixel(eventName) {
        const mapping = {
            'view_item': 'ViewContent',
            'add_to_cart': 'AddToCart',
            'add_to_wishlist': 'AddToWishlist',
            'begin_checkout': 'InitiateCheckout',
            'purchase': 'Purchase',
            'search': 'Search'
        };
        return mapping[eventName] || eventName;
    },

    /**
     * Store event in localStorage for custom analytics
     * @param {Object} event - Event object
     */
    storeEvent(event) {
        try {
            const storageKey = this.config.providers.customAnalytics.storageKey;
            const events = JSON.parse(localStorage.getItem(storageKey) || '[]');

            events.push(event);

            // Keep only last 100 events
            if (events.length > 100) {
                events.shift();
            }

            localStorage.setItem(storageKey, JSON.stringify(events));
        } catch (error) {
            console.error('Error storing analytics event:', error);
        }
    },

    /**
     * Get stored analytics events
     * @returns {Array} Array of events
     */
    getEvents() {
        try {
            const storageKey = this.config.providers.customAnalytics.storageKey;
            return JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch (error) {
            console.error('Error retrieving analytics events:', error);
            return [];
        }
    },

    /**
     * Get analytics report
     * @returns {Object} Analytics report
     */
    getReport() {
        const events = this.getEvents();

        return {
            totalEvents: events.length,
            pageViews: events.filter(e => e.name === 'page_view').length,
            productViews: events.filter(e => e.name === 'view_item').length,
            cartAdditions: events.filter(e => e.name === 'add_to_cart').length,
            purchases: events.filter(e => e.name === 'purchase').length,
            searches: events.filter(e => e.name === 'search').length,
            mostViewedPages: this.getMostViewedPages(events),
            mostViewedProducts: this.getMostViewedProducts(events),
            topSearchTerms: this.getTopSearchTerms(events)
        };
    },

    /**
     * Get most viewed pages
     */
    getMostViewedPages(events) {
        const pageViews = events.filter(e => e.name === 'page_view');
        const pages = {};

        pageViews.forEach(event => {
            const page = event.data.page_path;
            pages[page] = (pages[page] || 0) + 1;
        });

        return Object.entries(pages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
    },

    /**
     * Get most viewed products
     */
    getMostViewedProducts(events) {
        const productViews = events.filter(e => e.name === 'view_item');
        const products = {};

        productViews.forEach(event => {
            const product = event.data.items?.[0];
            if (product) {
                products[product.item_id] = (products[product.item_id] || 0) + 1;
            }
        });

        return Object.entries(products)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
    },

    /**
     * Get top search terms
     */
    getTopSearchTerms(events) {
        const searches = events.filter(e => e.name === 'search');
        const terms = {};

        searches.forEach(event => {
            const term = event.data.search_term;
            if (term) {
                terms[term] = (terms[term] || 0) + 1;
            }
        });

        return Object.entries(terms)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
    },

    /**
     * Clear analytics data
     */
    clear() {
        const storageKey = this.config.providers.customAnalytics.storageKey;
        localStorage.removeItem(storageKey);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Analytics };
}
