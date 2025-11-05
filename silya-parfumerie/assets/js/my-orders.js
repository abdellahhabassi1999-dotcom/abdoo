/* ====================================
   My Orders - Customer Order History
   ==================================== */

// ==================== Global State ====================
let allOrders = [];
let displayedOrders = [];
let cart = JSON.parse(localStorage.getItem('silya-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('silya-wishlist')) || [];

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadOrders();
    attachEventListeners();
    updateCartCount();
    updateWishlistCount();
});

// ==================== Theme Management ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('silya-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ==================== Load Orders ====================
function loadOrders() {
    // Get orders from localStorage
    allOrders = JSON.parse(localStorage.getItem('silya-orders')) || [];

    // Sort by date (newest first)
    allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    displayedOrders = [...allOrders];
    renderOrders();
}

// ==================== Render Orders ====================
function renderOrders() {
    const ordersList = document.getElementById('ordersList');

    if (displayedOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <i class="fas fa-box-open"></i>
                <h3>Aucune commande</h3>
                <p>Vous n'avez pas encore passé de commande</p>
                <a href="index.html#products" class="btn btn-primary">
                    <i class="fas fa-shopping-bag"></i> Commencer mes achats
                </a>
            </div>
        `;
        return;
    }

    ordersList.innerHTML = displayedOrders.map(order => `
        <div class="order-card" data-order-id="${order.id}">
            <div class="order-header">
                <div class="order-info">
                    <div class="order-number">
                        <i class="fas fa-hashtag"></i> ${order.orderNumber}
                    </div>
                    <div class="order-date">
                        <i class="far fa-calendar"></i> ${formatDate(order.date)}
                    </div>
                </div>
                <div class="order-status status-${order.status}">
                    ${getStatusText(order.status)}
                </div>
            </div>

            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="assets/images/${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='assets/images/products/placeholder.jpg'">
                        <div class="order-item-details">
                            <div class="order-item-name">${item.name}</div>
                            <div class="order-item-quantity">Quantité: ${item.quantity}</div>
                        </div>
                        <div class="order-item-price">${item.price * item.quantity} DH</div>
                    </div>
                `).join('')}
            </div>

            ${order.customerInfo ? `
                <div class="order-customer-info">
                    <h4><i class="fas fa-user"></i> Informations de livraison</h4>
                    <div class="customer-detail">
                        <i class="fas fa-user"></i>
                        <span>${order.customerInfo.name}</span>
                    </div>
                    <div class="customer-detail">
                        <i class="fas fa-phone"></i>
                        <span>${order.customerInfo.phone}</span>
                    </div>
                    <div class="customer-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${order.customerInfo.address}, ${order.customerInfo.city}</span>
                    </div>
                    ${order.customerInfo.notes ? `
                        <div class="customer-detail">
                            <i class="fas fa-sticky-note"></i>
                            <span>${order.customerInfo.notes}</span>
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            <div class="order-footer">
                <div class="order-total">
                    Total: <span>${order.total} DH</span>
                </div>
                <div class="order-actions">
                    <button class="btn-details" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i> Détails
                    </button>
                    ${order.status !== 'cancelled' ? `
                        <button class="btn-reorder" onclick="reorder('${order.id}')">
                            <i class="fas fa-redo"></i> Commander à nouveau
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== Format Date ====================
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('fr-FR', options);
}

// ==================== Get Status Text ====================
function getStatusText(status) {
    const statusTexts = {
        pending: 'En attente',
        confirmed: 'Confirmée',
        processing: 'En préparation',
        shipped: 'Expédiée',
        delivered: 'Livrée',
        cancelled: 'Annulée'
    };
    return statusTexts[status] || status;
}

// ==================== Search Orders ====================
function searchOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();

    displayedOrders = allOrders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm)) ||
        (order.customerInfo && order.customerInfo.name.toLowerCase().includes(searchTerm))
    );

    renderOrders();
}

// ==================== Filter Orders ====================
function filterOrders() {
    const statusFilter = document.getElementById('statusFilter').value;

    if (statusFilter === 'all') {
        displayedOrders = [...allOrders];
    } else {
        displayedOrders = allOrders.filter(order => order.status === statusFilter);
    }

    renderOrders();
}

// ==================== View Order Details ====================
function viewOrderDetails(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    // Scroll to the order card
    const orderCard = document.querySelector(`[data-order-id="${orderId}"]`);
    if (orderCard) {
        orderCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight the card temporarily
        orderCard.style.borderColor = 'var(--gold-primary)';
        orderCard.style.boxShadow = '0 4px 20px rgba(200, 168, 130, 0.3)';

        setTimeout(() => {
            orderCard.style.borderColor = '';
            orderCard.style.boxShadow = '';
        }, 2000);
    }

    showNotification('Détails de la commande affichés', 'success');
}

// ==================== Reorder ====================
function reorder(orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;

    // Clear current cart
    cart = [];

    // Add all items from the order to cart
    order.items.forEach(item => {
        cart.push({
            id: item.id || Math.random().toString(36).substr(2, 9),
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        });
    });

    // Save to localStorage
    localStorage.setItem('silya-cart', JSON.stringify(cart));

    // Show notification and redirect
    showNotification(`${order.items.length} produit(s) ajouté(s) au panier`, 'success');

    setTimeout(() => {
        window.location.href = 'index.html#products';
    }, 1500);
}

// ==================== Cart & Wishlist Management ====================
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;

        if (wishlist.length > 0) {
            wishlistCount.style.display = 'flex';
        } else {
            wishlistCount.style.display = 'none';
        }
    }
}

// ==================== Notifications ====================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                border-left: 4px solid #28a745;
            }
            .notification-success i {
                color: #28a745;
            }
            .notification-info {
                border-left: 4px solid #17a2b8;
            }
            .notification-info i {
                color: #17a2b8;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== Event Listeners ====================
function attachEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('silya-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // Order search - search as user types
    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', searchOrders);
    }

    // Cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.querySelector('.cart-close');
    const overlay = document.getElementById('overlay');

    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Wishlist toggle
    const wishlistToggle = document.querySelector('.wishlist-toggle');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistClose = document.querySelector('.wishlist-close');

    if (wishlistToggle && wishlistSidebar) {
        wishlistToggle.addEventListener('click', () => {
            wishlistSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (wishlistClose) {
        wishlistClose.addEventListener('click', () => {
            wishlistSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Overlay click
    if (overlay) {
        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            wishlistSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll to top
    const scrollToTop = document.getElementById('scrollToTop');
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
