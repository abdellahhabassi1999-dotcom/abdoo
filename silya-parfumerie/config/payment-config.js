/* ====================================
   Silya's Parfumerie - Payment Configuration
   Payment Gateway Settings & Methods
   ==================================== */

const paymentConfig = {
    // Supported Payment Methods
    methods: {
        cod: {
            id: 'cod',
            name: {
                fr: 'Paiement à la livraison',
                en: 'Cash on Delivery',
                ar: 'الدفع عند الاستلام'
            },
            description: {
                fr: 'Payez en espèces lors de la réception de votre commande',
                en: 'Pay with cash when you receive your order',
                ar: 'ادفع نقداً عند استلام طلبك'
            },
            icon: 'fas fa-money-bill-wave',
            enabled: true,
            fee: 0,
            minAmount: 50,
            maxAmount: 5000,
            availableRegions: ['all']
        },
        bankTransfer: {
            id: 'bank_transfer',
            name: {
                fr: 'Virement bancaire',
                en: 'Bank Transfer',
                ar: 'تحويل بنكي'
            },
            description: {
                fr: 'Effectuez un virement vers notre compte bancaire',
                en: 'Transfer to our bank account',
                ar: 'قم بالتحويل إلى حسابنا البنكي'
            },
            icon: 'fas fa-university',
            enabled: true,
            fee: 0,
            minAmount: 200,
            maxAmount: 50000,
            availableRegions: ['all'],
            bankDetails: {
                bankName: 'Attijariwafa Bank',
                accountName: 'Silya\'s Parfumerie SARL',
                accountNumber: 'XXXX XXXX XXXX XXXX', // Replace with actual
                iban: 'MA00 0000 0000 0000 0000 0000 0000', // Replace with actual
                swift: 'BCMAMAMC',
                branch: 'Kénitra',
                instructions: {
                    fr: 'Veuillez inclure votre numéro de commande comme référence lors du virement.',
                    en: 'Please include your order number as reference when making the transfer.',
                    ar: 'يرجى تضمين رقم طلبك كمرجع عند إجراء التحويل.'
                }
            }
        },
        card: {
            id: 'card',
            name: {
                fr: 'Carte bancaire',
                en: 'Credit/Debit Card',
                ar: 'بطاقة ائتمان/خصم'
            },
            description: {
                fr: 'Paiement sécurisé par carte Visa ou Mastercard',
                en: 'Secure payment with Visa or Mastercard',
                ar: 'الدفع الآمن ببطاقة فيزا أو ماستركارد'
            },
            icon: 'fas fa-credit-card',
            enabled: true,
            fee: 0,
            minAmount: 50,
            maxAmount: 50000,
            availableRegions: ['all'],
            acceptedCards: ['visa', 'mastercard'],
            // Payment gateway integration (CMI - Centre Monétique Interbancaire Morocco)
            gateway: {
                provider: 'cmi',
                testMode: true, // Set to false in production
                merchantId: '', // Add your CMI merchant ID
                apiKey: '', // Add your CMI API key
                currency: 'MAD',
                returnUrl: 'https://silyasparfumerie.com/payment/success',
                cancelUrl: 'https://silyasparfumerie.com/payment/cancel',
                notifyUrl: 'https://silyasparfumerie.com/payment/notify'
            }
        },
        paypal: {
            id: 'paypal',
            name: {
                fr: 'PayPal',
                en: 'PayPal',
                ar: 'باي بال'
            },
            description: {
                fr: 'Paiement sécurisé via PayPal',
                en: 'Secure payment via PayPal',
                ar: 'الدفع الآمن عبر باي بال'
            },
            icon: 'fab fa-paypal',
            enabled: false, // Disabled by default
            fee: 0,
            minAmount: 100,
            maxAmount: 50000,
            availableRegions: ['all'],
            gateway: {
                clientId: '', // Add your PayPal client ID
                secret: '', // Add your PayPal secret
                mode: 'sandbox' // 'sandbox' or 'live'
            }
        }
    },

    // Default Payment Method
    defaultMethod: 'cod',

    // Payment Settings
    settings: {
        // Currency
        currency: {
            code: 'MAD',
            symbol: 'DH',
            position: 'after', // 'before' or 'after'
            decimals: 2,
            thousandsSeparator: ' ',
            decimalSeparator: '.'
        },

        // Transaction Settings
        transaction: {
            autoConfirm: false, // Automatically confirm orders
            confirmationTimeout: 24, // Hours before order cancellation
            maxRetries: 3, // Maximum payment retry attempts
            retryDelay: 5 // Minutes between retries
        },

        // Security
        security: {
            requireCVV: true,
            enable3DSecure: true,
            encryptData: true,
            tokenizeCards: true,
            fraudDetection: true
        },

        // Notifications
        notifications: {
            email: {
                sendReceipt: true,
                sendConfirmation: true,
                sendFailure: true
            },
            sms: {
                sendConfirmation: false,
                sendFailure: false
            },
            whatsapp: {
                sendConfirmation: true,
                sendReceipt: true
            }
        }
    },

    // Discount/Coupon Settings
    coupons: {
        enabled: true,
        maxDiscountPercent: 70,
        allowStacking: false, // Allow multiple coupons on same order
        minimumOrderAmount: 100,
        codes: {
            // Example coupon codes (should be stored in database in production)
            WELCOME10: {
                type: 'percentage',
                value: 10,
                minAmount: 200,
                maxDiscount: 100,
                validFrom: '2024-01-01',
                validUntil: '2024-12-31',
                maxUses: null, // null = unlimited
                usedCount: 0,
                description: {
                    fr: 'Réduction de 10% pour les nouveaux clients',
                    en: '10% discount for new customers',
                    ar: 'خصم 10% للعملاء الجدد'
                }
            },
            SAVE50: {
                type: 'fixed',
                value: 50,
                minAmount: 300,
                validFrom: '2024-01-01',
                validUntil: '2024-12-31',
                maxUses: 100,
                usedCount: 12,
                description: {
                    fr: 'Réduction de 50 DH sur commande minimum 300 DH',
                    en: '50 DH off on orders over 300 DH',
                    ar: 'خصم 50 درهم على الطلبات فوق 300 درهم'
                }
            },
            FREESHIP: {
                type: 'free_shipping',
                value: 0,
                minAmount: 200,
                validFrom: '2024-01-01',
                validUntil: '2024-12-31',
                maxUses: null,
                usedCount: 45,
                description: {
                    fr: 'Livraison gratuite sur commande minimum 200 DH',
                    en: 'Free shipping on orders over 200 DH',
                    ar: 'شحن مجاني على الطلبات فوق 200 درهم'
                }
            }
        }
    },

    // Refund Settings
    refunds: {
        enabled: true,
        allowPartialRefund: true,
        refundWindow: 7, // Days
        processingTime: '5-7', // Business days
        methods: ['original_payment', 'store_credit'],
        autoApprove: false
    },

    // Tax Settings
    tax: {
        enabled: false, // Morocco VAT
        rate: 20, // 20% VAT
        includedInPrice: true,
        displaySeparately: false
    }
};

// Helper Functions

/**
 * Get available payment methods for a specific amount and region
 */
function getAvailablePaymentMethods(amount, region = 'all') {
    return Object.values(paymentConfig.methods).filter(method => {
        return method.enabled &&
               amount >= method.minAmount &&
               amount <= method.maxAmount &&
               (method.availableRegions.includes('all') || method.availableRegions.includes(region));
    });
}

/**
 * Calculate payment fee
 */
function calculatePaymentFee(methodId, amount) {
    const method = paymentConfig.methods[methodId];
    if (!method) return 0;
    return method.fee;
}

/**
 * Validate coupon code
 */
function validateCoupon(code, orderAmount) {
    const coupon = paymentConfig.coupons.codes[code];

    if (!coupon) {
        return { valid: false, message: 'Code promo invalide' };
    }

    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validUntil = new Date(coupon.validUntil);

    if (now < validFrom || now > validUntil) {
        return { valid: false, message: 'Code promo expiré' };
    }

    if (orderAmount < coupon.minAmount) {
        return { valid: false, message: `Montant minimum: ${coupon.minAmount} DH` };
    }

    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
        return { valid: false, message: 'Code promo épuisé' };
    }

    return { valid: true, coupon: coupon };
}

/**
 * Calculate discount amount
 */
function calculateDiscount(coupon, orderAmount, shippingFee = 0) {
    let discount = 0;

    switch (coupon.type) {
        case 'percentage':
            discount = (orderAmount * coupon.value) / 100;
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
            break;

        case 'fixed':
            discount = Math.min(coupon.value, orderAmount);
            break;

        case 'free_shipping':
            discount = shippingFee;
            break;
    }

    return Math.round(discount * 100) / 100;
}

/**
 * Format price according to currency settings
 */
function formatPrice(amount) {
    const settings = paymentConfig.settings.currency;
    const formatted = amount.toFixed(settings.decimals)
        .replace('.', settings.decimalSeparator)
        .replace(/\B(?=(\d{3})+(?!\d))/g, settings.thousandsSeparator);

    return settings.position === 'before'
        ? `${settings.symbol}${formatted}`
        : `${formatted} ${settings.symbol}`;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        paymentConfig,
        getAvailablePaymentMethods,
        calculatePaymentFee,
        validateCoupon,
        calculateDiscount,
        formatPrice
    };
}
