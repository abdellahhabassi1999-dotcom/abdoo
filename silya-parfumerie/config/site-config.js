/* ====================================
   Silya's Parfumerie - Site Configuration
   ==================================== */

const siteConfig = {
    // Site Information
    siteName: 'Silya\'s Parfumerie',
    siteTagline: 'Beauté & Élégance',
    siteLogo: 'assets/images/logo/logo.png',
    siteFavicon: 'assets/images/logo/favicon.png',

    // Contact Information
    contact: {
        phone: '+212 766 985 350',
        phoneDisplay: '+212 766 985 350',
        email: 'contact@silyasparfumerie.ma',
        whatsapp: '212766985350',
        address: {
            street: 'Kénitra Mall, 1er étage',
            unit: 'Magasin n°82',
            city: 'Kénitra',
            country: 'Maroc',
            postalCode: ''
        }
    },

    // Social Media Links
    socialMedia: {
        instagram: 'https://instagram.com/silya_parfumerie',
        facebook: 'https://facebook.com/silyasparfumerie',
        tiktok: 'https://tiktok.com/@silya_parfumerie',
        whatsapp: 'https://wa.me/212766985350'
    },

    // Business Hours
    businessHours: {
        weekdays: '10:00 - 22:00',
        weekends: '10:00 - 22:00',
        display: '10:00 - 22:00 (Tous les jours)'
    },

    // Currency
    currency: {
        code: 'DH',
        symbol: 'DH',
        position: 'after', // 'before' or 'after'
        decimals: 2
    },

    // Shipping
    shipping: {
        freeShippingThreshold: 500, // Free shipping over this amount
        standardShippingFee: 30,
        estimatedDays: '2-5',
        regions: ['Tout le Maroc']
    },

    // Features
    features: {
        multiLanguage: true,
        darkMode: true,
        wishlist: true,
        cart: true,
        search: true,
        productFilters: true,
        quickView: true,
        whatsappOrder: true
    },

    // Supported Languages
    languages: [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ar', name: 'العربية', flag: '🇲🇦', rtl: true }
    ],

    // Default Language
    defaultLanguage: 'fr',

    // Theme
    theme: {
        defaultTheme: 'light',
        allowToggle: true,
        primaryColor: '#C8A882',
        secondaryColor: '#A08968'
    },

    // SEO
    seo: {
        metaTitle: 'Silya\'s Parfumerie - Beauté & Élégance | Kénitra',
        metaDescription: 'Votre destination beauté à Kénitra. Parfums authentiques, cosmétiques de qualité premium, soins de beauté. Livraison partout au Maroc.',
        metaKeywords: 'parfumerie, cosmétiques, beauté, Kénitra, Maroc, parfums, maquillage, soins',
        ogImage: 'assets/images/og-image.jpg',
        twitterCard: 'summary_large_image'
    },

    // Analytics
    analytics: {
        googleAnalyticsId: '', // Add your GA ID
        facebookPixelId: '', // Add your Facebook Pixel ID
        enabled: false
    },

    // API Endpoints (for future backend integration)
    api: {
        baseUrl: '/api',
        endpoints: {
            products: '/products',
            categories: '/categories',
            orders: '/orders',
            customers: '/customers',
            auth: '/auth'
        }
    },

    // Cart Settings
    cart: {
        maxQuantityPerItem: 10,
        saveToLocalStorage: true,
        expirationDays: 7
    },

    // Product Settings
    products: {
        productsPerPage: 12,
        loadMoreIncrement: 12,
        defaultSort: 'featured',
        showOutOfStock: true,
        imageLoadingStrategy: 'lazy'
    },

    // Admin Settings
    admin: {
        sessionTimeout: 7, // days
        autoSaveInterval: 5, // minutes
        maxLoginAttempts: 5,
        lockoutDuration: 5 // minutes
    },

    // Cache Settings
    cache: {
        enabled: true,
        duration: 3600, // seconds
        keys: {
            products: 'silya-products-cache',
            categories: 'silya-categories-cache'
        }
    },

    // Performance
    performance: {
        lazyLoadImages: true,
        minifyAssets: true,
        enableServiceWorker: false,
        cacheStaticAssets: true
    },

    // Error Messages
    errorMessages: {
        networkError: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
        notFound: 'Page non trouvée.',
        serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
        validationError: 'Veuillez vérifier les informations saisies.'
    },

    // Success Messages
    successMessages: {
        addedToCart: 'Produit ajouté au panier avec succès',
        addedToWishlist: 'Produit ajouté à la liste de souhaits',
        orderPlaced: 'Commande passée avec succès',
        messageSent: 'Message envoyé avec succès'
    }
};

// Helper function to format price
function formatPrice(price) {
    const formatted = price.toFixed(siteConfig.currency.decimals);
    return siteConfig.currency.position === 'before'
        ? `${siteConfig.currency.symbol}${formatted}`
        : `${formatted} ${siteConfig.currency.symbol}`;
}

// Helper function to get currency symbol
function getCurrencySymbol() {
    return siteConfig.currency.symbol;
}

// Helper function to check if feature is enabled
function isFeatureEnabled(feature) {
    return siteConfig.features[feature] === true;
}

// Helper function to get API URL
function getApiUrl(endpoint) {
    return `${siteConfig.api.baseUrl}${siteConfig.api.endpoints[endpoint]}`;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        siteConfig,
        formatPrice,
        getCurrencySymbol,
        isFeatureEnabled,
        getApiUrl
    };
}
