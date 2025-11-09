/* ====================================
   Performance Optimization & Utilities
   Modern Web Development Best Practices
   ==================================== */

// ==================== Performance Utilities ====================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function}
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Intersection Observer for lazy loading
 */
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;

            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.01
});

/**
 * Initialize lazy loading for all images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => lazyLoadObserver.observe(img));
}

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80', // Hero slide 1
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80'  // Hero slide 2
    ];

    criticalImages.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
}

/**
 * Request Animation Frame wrapper
 */
const raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 1000 / 60); };

// ==================== Error Handling ====================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error
    });

    // Show user-friendly error message
    showNotification('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

/**
 * Promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showNotification('Une erreur est survenue lors du chargement.', 'error');
});

/**
 * Safe JSON parse
 * @param {string} str - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*}
 */
function safeJSONParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn('JSON parse error:', e);
        return fallback;
    }
}

/**
 * Safe localStorage wrapper
 */
const storage = {
    get(key, fallback = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? safeJSONParse(item, fallback) : fallback;
        } catch (e) {
            console.warn('localStorage get error:', e);
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('localStorage set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('localStorage remove error:', e);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.warn('localStorage clear error:', e);
            return false;
        }
    }
};

// ==================== Notification System ====================

/**
 * Show notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type: success, error, warning, info
 * @param {number} duration - Duration in ms
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    const icon = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    }[type] || 'fa-info-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Fermer">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    raf(() => notification.classList.add('show'));

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto-close
    if (duration > 0) {
        setTimeout(() => closeNotification(notification), duration);
    }
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
}

// ==================== Loading States ====================

/**
 * Show loading spinner
 * @param {string} target - Selector for target element
 */
function showLoading(target = 'body') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
        <div class="spinner"></div>
        <p>Chargement...</p>
    `;

    element.appendChild(spinner);
}

/**
 * Hide loading spinner
 * @param {string} target - Selector for target element
 */
function hideLoading(target = 'body') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const spinner = element.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
}

// ==================== Form Validation ====================

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate Moroccan phone number
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
    // Moroccan phone format: +212 6XX XXX XXX or 06XX XXX XXX
    const regex = /^(\+212|0)[5-7]\d{8}$/;
    return regex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitize HTML to prevent XSS
 * @param {string} str
 * @returns {string}
 */
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// ==================== Analytics Hooks ====================

/**
 * Track page view
 * @param {string} page - Page name
 */
function trackPageView(page) {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: page
        });
    }
    console.log('Page view:', page);
}

/**
 * Track event
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {number} value
 */
function trackEvent(category, action, label = '', value = 0) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    console.log('Event:', { category, action, label, value });
}

// ==================== URL Utilities ====================

/**
 * Get URL parameter
 * @param {string} param
 * @returns {string|null}
 */
function getURLParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Update URL without reload
 * @param {string} param
 * @param {string} value
 */
function updateURLParameter(param, value) {
    const url = new URL(window.location);
    if (value) {
        url.searchParams.set(param, value);
    } else {
        url.searchParams.delete(param);
    }
    window.history.pushState({}, '', url);
}

// ==================== Scroll Utilities ====================

/**
 * Smooth scroll to element
 * @param {string|HTMLElement} target
 * @param {number} offset
 */
function scrollToElement(target, offset = 80) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== Currency Formatting ====================

/**
 * Format price in Moroccan Dirham
 * @param {number} amount
 * @returns {string}
 */
function formatPrice(amount) {
    return new Intl.NumberFormat('fr-MA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount) + ' DH';
}

/**
 * Calculate discount percentage
 * @param {number} original
 * @param {number} sale
 * @returns {number}
 */
function calculateDiscount(original, sale) {
    return Math.round(((original - sale) / original) * 100);
}

// ==================== Date Utilities ====================

/**
 * Format date in French
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Get relative time (e.g., "il y a 2 heures")
 * @param {Date} date
 * @returns {string}
 */
function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    return 'à l\'instant';
}

// ==================== Export for use ====================
window.SilyaUtils = {
    debounce,
    throttle,
    storage,
    showNotification,
    showLoading,
    hideLoading,
    isValidEmail,
    isValidPhone,
    sanitizeHTML,
    trackPageView,
    trackEvent,
    getURLParameter,
    updateURLParameter,
    scrollToElement,
    isInViewport,
    formatPrice,
    calculateDiscount,
    formatDate,
    getRelativeTime,
    initLazyLoading,
    preloadCriticalResources
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Silya\'s Parfumerie - Performance utilities loaded');
    preloadCriticalResources();
});
