/**
 * ============================================
 * API Service - Backend Integration
 * Silya's Elite V3
 * ============================================
 */

// Sample product data (will be replaced with real API)
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "Dior Sauvage Eau de Parfum",
        brand: "Dior",
        category: "parfums",
        price: 899,
        originalPrice: 1099,
        discount: 18,
        rating: 4.8,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
        description: "Un parfum masculin puissant et sauvage, mélange d'épices et de fraîcheur",
        inStock: true,
        stock: 45,
        featured: true,
        new: false,
        volume: "100ml",
        createdAt: "2025-01-15"
    },
    {
        id: 2,
        name: "Chanel N°5 Eau de Parfum",
        brand: "Chanel",
        category: "parfums",
        price: 1299,
        originalPrice: 1499,
        discount: 13,
        rating: 4.9,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80",
        description: "L'essence même de la féminité dans un flacon intemporel",
        inStock: true,
        stock: 32,
        featured: true,
        new: false,
        volume: "100ml",
        createdAt: "2025-01-10"
    },
    {
        id: 3,
        name: "Tom Ford Black Orchid",
        brand: "Tom Ford",
        category: "parfums",
        price: 1599,
        originalPrice: null,
        discount: 0,
        rating: 4.7,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&q=80",
        description: "Luxe, sensualité et mystère dans une fragrance orientale audacieuse",
        inStock: true,
        stock: 28,
        featured: true,
        new: true,
        volume: "100ml",
        createdAt: "2025-01-20"
    },
    {
        id: 4,
        name: "La Roche-Posay Cicaplast Baume",
        brand: "La Roche-Posay",
        category: "skincare",
        price: 149,
        originalPrice: 179,
        discount: 17,
        rating: 4.6,
        reviews: 432,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
        description: "Baume réparateur multi-usages pour peaux sensibles et irritées",
        inStock: true,
        stock: 156,
        featured: true,
        new: false,
        volume: "100ml",
        createdAt: "2025-01-05"
    },
    {
        id: 5,
        name: "CeraVe Hydrating Cleanser",
        brand: "CeraVe",
        category: "skincare",
        price: 129,
        originalPrice: null,
        discount: 0,
        rating: 4.5,
        reviews: 678,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
        description: "Nettoyant hydratant visage et corps pour peau normale à sèche",
        inStock: true,
        stock: 203,
        featured: false,
        new: false,
        volume: "236ml",
        createdAt: "2024-12-20"
    },
    {
        id: 6,
        name: "MAC Ruby Woo Lipstick",
        brand: "MAC",
        category: "makeup",
        price: 189,
        originalPrice: 219,
        discount: 14,
        rating: 4.8,
        reviews: 892,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
        description: "Rouge à lèvres mat iconique, rouge vif bleuté",
        inStock: true,
        stock: 67,
        featured: true,
        new: false,
        volume: "3g",
        createdAt: "2024-12-15"
    }
];

const SAMPLE_CATEGORIES = [
    { id: "parfums", name: "Parfums", icon: "fa-spray-can-sparkles", count: 18 },
    { id: "skincare", name: "Soins de la Peau", icon: "fa-droplet", count: 15 },
    { id: "makeup", name: "Maquillage", icon: "fa-palette", count: 12 },
    { id: "haircare", name: "Soins Capillaires", icon: "fa-scissors", count: 8 },
    { id: "hygiene", name: "Hygiène", icon: "fa-hand-sparkles", count: 6 },
    { id: "coffrets", name: "Coffrets Cadeaux", icon: "fa-gift", count: 5 }
];

class APIService {
    constructor() {
        this.baseURL = '/api'; // Will be configured for production
        this.http = window.http; // Using framework HTTP client
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    /**
     * Get all products
     */
    async getProducts(params = {}) {
        const cacheKey = 'products_' + JSON.stringify(params);

        // Check cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            // Simulate API call
            await this.delay(300);

            let products = [...SAMPLE_PRODUCTS];

            // Apply filters
            if (params.category && params.category !== 'all') {
                products = products.filter(p => p.category === params.category);
            }

            if (params.search) {
                const query = params.search.toLowerCase();
                products = products.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query)
                );
            }

            if (params.featured) {
                products = products.filter(p => p.featured);
            }

            if (params.new) {
                products = products.filter(p => p.new);
            }

            // Cache result
            this.cache.set(cacheKey, {
                data: products,
                timestamp: Date.now()
            });

            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    /**
     * Get single product by ID
     */
    async getProduct(id) {
        try {
            await this.delay(200);
            const product = SAMPLE_PRODUCTS.find(p => p.id === parseInt(id));

            if (!product) {
                throw new Error('Product not found');
            }

            return product;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }

    /**
     * Get all categories
     */
    async getCategories() {
        const cacheKey = 'categories';

        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            await this.delay(200);

            this.cache.set(cacheKey, {
                data: SAMPLE_CATEGORIES,
                timestamp: Date.now()
            });

            return SAMPLE_CATEGORIES;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    /**
     * Submit order
     */
    async submitOrder(orderData) {
        try {
            await this.delay(500);

            const order = {
                id: 'ORD-' + Date.now(),
                ...orderData,
                status: 'pending',
                createdAt: new Date().toISOString(),
                estimatedDelivery: this.calculateDeliveryDate()
            };

            // In production, this would be a real API call
            console.log('Order submitted:', order);

            return order;
        } catch (error) {
            console.error('Error submitting order:', error);
            throw error;
        }
    }

    /**
     * Get user orders
     */
    async getUserOrders(userId) {
        try {
            await this.delay(300);

            // Mock orders - would come from real API
            return [];
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }

    /**
     * Authenticate user
     */
    async login(credentials) {
        try {
            await this.delay(500);

            // Mock authentication
            if (credentials.email && credentials.password) {
                return {
                    id: 'USER-' + Date.now(),
                    email: credentials.email,
                    name: credentials.name || 'User',
                    phone: credentials.phone || '',
                    token: 'mock_token_' + Math.random()
                };
            }

            throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Register new user
     */
    async register(userData) {
        try {
            await this.delay(500);

            return {
                id: 'USER-' + Date.now(),
                ...userData,
                token: 'mock_token_' + Math.random()
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    /**
     * Validate coupon
     */
    async validateCoupon(code) {
        try {
            await this.delay(300);

            // Mock coupons
            const coupons = {
                'WELCOME10': { type: 'percentage', value: 10, minOrder: 200 },
                'SAVE50': { type: 'fixed', value: 50, minOrder: 300 },
                'ELITE20': { type: 'percentage', value: 20, minOrder: 500 }
            };

            const coupon = coupons[code.toUpperCase()];

            if (!coupon) {
                throw new Error('Coupon invalide');
            }

            return {
                code: code.toUpperCase(),
                ...coupon
            };
        } catch (error) {
            console.error('Coupon validation error:', error);
            throw error;
        }
    }

    /**
     * Send WhatsApp order
     */
    sendWhatsAppOrder(orderData) {
        const phone = '+212766985350';
        const message = this.formatWhatsAppMessage(orderData);
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    /**
     * Format WhatsApp message
     */
    formatWhatsAppMessage(orderData) {
        let message = '🛍️ *Nouvelle Commande - Silya\'s Elite*\n\n';

        message += '*Produits:*\n';
        orderData.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity} - ${item.price * item.quantity} MAD\n`;
        });

        message += `\n*Total:* ${orderData.total} MAD\n\n`;

        message += '*Informations Client:*\n';
        message += `Nom: ${orderData.customer.name}\n`;
        message += `Téléphone: ${orderData.customer.phone}\n`;
        message += `Adresse: ${orderData.customer.address}\n`;
        message += `Ville: ${orderData.customer.city}\n`;

        if (orderData.customer.notes) {
            message += `\nNotes: ${orderData.customer.notes}`;
        }

        return message;
    }

    /**
     * Helper: Delay for simulation
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Helper: Calculate delivery date
     */
    calculateDeliveryDate() {
        const date = new Date();
        date.setDate(date.getDate() + 3); // 3 days delivery
        return date.toISOString();
    }
}

// Create singleton instance
const api = new APIService();
window.api = api;
