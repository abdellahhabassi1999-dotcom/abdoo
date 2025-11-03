/* ====================================
   Silya's Parfumerie - WhatsApp Configuration
   ==================================== */

const whatsappConfig = {
    // Business Phone Number (without + or country code prefix)
    phoneNumber: '212766985350',

    // Business Name
    businessName: 'Silya\'s Parfumerie',

    // Default greeting message
    greetingMessage: '👋 Bonjour! Bienvenue chez Silya\'s Parfumerie.',

    // Order message template
    orderTemplate: {
        header: '🛍️ *Nouvelle Commande - Silya\'s Parfumerie*\n━━━━━━━━━━━━━━━━━━━━\n\n',
        itemFormat: '📦 *{name}*\n   Quantité: {quantity}\n   Prix unitaire: {price} DH\n   Sous-total: {subtotal} DH\n\n',
        footer: '━━━━━━━━━━━━━━━━━━━━\n💰 *Total: {total} DH*\n\n📍 Adresse de livraison: [À compléter]\n📞 Téléphone: [À compléter]\n\nMerci pour votre commande! 🌸'
    },

    // Product inquiry template
    productInquiryTemplate: '👋 Bonjour!\n\nJe suis intéressé(e) par le produit suivant:\n\n📦 *{productName}*\n💰 Prix: {price} DH\n\nPourrais-je avoir plus d\'informations?\n\nMerci!',

    // General inquiry template
    generalInquiryTemplate: '👋 Bonjour!\n\nJe voudrais avoir des informations sur vos produits.\n\nMerci!',

    // Business hours
    businessHours: {
        monday: { open: '10:00', close: '22:00' },
        tuesday: { open: '10:00', close: '22:00' },
        wednesday: { open: '10:00', close: '22:00' },
        thursday: { open: '10:00', close: '22:00' },
        friday: { open: '10:00', close: '22:00' },
        saturday: { open: '10:00', close: '22:00' },
        sunday: { open: '10:00', close: '22:00' }
    },

    // Auto-reply messages
    autoReply: {
        outsideBusinessHours: 'Merci de votre message! Nous sommes actuellement fermés. Nos horaires: 10h-22h tous les jours. Nous vous répondrons dès notre retour.',
        quickResponses: [
            { trigger: 'horaires', response: '🕐 Nos horaires d\'ouverture:\nTous les jours: 10h - 22h\nKénitra Mall, 1er étage, Magasin n°82' },
            { trigger: 'adresse', response: '📍 Notre adresse:\nKénitra Mall\n1er étage, Magasin n°82\nKénitra, Maroc' },
            { trigger: 'livraison', response: '🚚 Livraison:\n✅ Livraison gratuite pour commande > 500 DH\n✅ Livraison partout au Maroc\n✅ Délai: 2-5 jours ouvrables' },
            { trigger: 'paiement', response: '💳 Modes de paiement:\n✅ Espèces\n✅ Carte bancaire\n✅ Paiement à la livraison' }
        ]
    },

    // Message formatting options
    formatting: {
        bold: true,
        italic: false,
        useEmojis: true
    }
};

// Helper function to generate WhatsApp URL
function generateWhatsAppURL(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
}

// Helper function to format order message
function formatOrderMessage(cart) {
    let message = whatsappConfig.orderTemplate.header;

    cart.forEach(item => {
        const itemMessage = whatsappConfig.orderTemplate.itemFormat
            .replace('{name}', item.name)
            .replace('{quantity}', item.quantity)
            .replace('{price}', item.price)
            .replace('{subtotal}', (item.price * item.quantity).toFixed(2));

        message += itemMessage;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += whatsappConfig.orderTemplate.footer.replace('{total}', total.toFixed(2));

    return message;
}

// Helper function to format product inquiry
function formatProductInquiry(product) {
    return whatsappConfig.productInquiryTemplate
        .replace('{productName}', product.name)
        .replace('{price}', product.price);
}

// Helper function to check if within business hours
function isWithinBusinessHours() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const hours = whatsappConfig.businessHours[day];
    if (!hours) return true; // If no hours defined, assume always open

    const [openHour, openMin] = hours.open.split(':').map(Number);
    const [closeHour, closeMin] = hours.close.split(':').map(Number);

    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    return currentTime >= openTime && currentTime <= closeTime;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        whatsappConfig,
        generateWhatsAppURL,
        formatOrderMessage,
        formatProductInquiry,
        isWithinBusinessHours
    };
}
