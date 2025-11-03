/* ====================================
   Silya's Parfumerie - Admin Panel
   ==================================== */

// Global state
let products = [];
let categories = [];
let currentEditingProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Load data
    loadData();

    // Initialize UI
    initializeUI();

    // Set admin name
    const session = getSession();
    if (session) {
        document.getElementById('adminName').textContent = session.username;
    }
});

// Check if user is logged in
function isLoggedIn() {
    const localSession = localStorage.getItem('silya-admin-session');
    const sessionSession = sessionStorage.getItem('silya-admin-session');
    return !!(localSession || sessionSession);
}

// Get session data
function getSession() {
    const localSession = localStorage.getItem('silya-admin-session');
    const sessionSession = sessionStorage.getItem('silya-admin-session');

    try {
        return JSON.parse(localSession || sessionSession);
    } catch (error) {
        return null;
    }
}

// Logout
function logout() {
    localStorage.removeItem('silya-admin-session');
    sessionStorage.removeItem('silya-admin-session');
    window.location.href = 'login.html';
}

// ==================== Load Data ====================
async function loadData() {
    try {
        // Try to load from JSON files
        const productsResponse = await fetch('../assets/data/products.json');
        const categoriesResponse = await fetch('../assets/data/categories.json');

        if (productsResponse.ok && categoriesResponse.ok) {
            products = await productsResponse.json();
            categories = await categoriesResponse.json();
            console.log('✅ Admin: Data loaded from JSON successfully');
        } else {
            throw new Error('Failed to fetch JSON files');
        }
    } catch (error) {
        console.warn('⚠️  Admin: Loading from JSON failed, loading from localStorage or using defaults');

        // Try to load from localStorage (if user added products)
        const savedProducts = localStorage.getItem('silya-products');
        if (savedProducts) {
            try {
                products = JSON.parse(savedProducts);
                console.log('✅ Loaded products from localStorage');
            } catch (e) {
                console.error('Failed to parse saved products');
            }
        }

        // Load default categories
        if (categories.length === 0) {
            categories = [
                { id: 'gifts', name: 'Coffrets Cadeaux', icon: 'fa-gift', description: 'Coffrets élégants' },
                { id: 'parfums', name: 'Parfums', icon: 'fa-spray-can', description: 'Collection exclusive' },
                { id: 'skincare', name: 'Soins de la Peau', icon: 'fa-hand-sparkles', description: 'Produits de soin' },
                { id: 'haircare', name: 'Soins Capillaires', icon: 'fa-spray-can-sparkles', description: 'Solutions professionnelles' },
                { id: 'hygiene', name: 'Hygiène', icon: 'fa-pump-soap', description: 'Produits d\'hygiène' },
                { id: 'makeup', name: 'Maquillage', icon: 'fa-palette', description: 'Cosmétiques de luxe' }
            ];
        }

        // Load default products if empty
        if (products.length === 0) {
            products = getDefaultProducts();
            showNotification('Données de démonstration chargées. Ajoutez vos propres produits!', 'info');
        }
    } finally {
        // Render initial page
        renderDashboard();
        renderProducts();
        renderCategories();
    }
}

// Default products for demo
function getDefaultProducts() {
    return [
        {
            id: 1,
            name: 'Dior Sauvage Eau de Parfum',
            brand: 'Dior',
            category: 'parfums',
            price: 1200,
            originalPrice: 1500,
            image: 'products/dior-sauvage.jpg',
            rating: 4.8,
            reviews: 245,
            badge: 'bestseller',
            inStock: true,
            description: 'Un parfum masculin puissant et raffiné',
            volume: '100ml'
        },
        {
            id: 2,
            name: 'Chanel N°5 Eau de Parfum',
            brand: 'Chanel',
            category: 'parfums',
            price: 1800,
            image: 'products/chanel-5.jpg',
            rating: 4.9,
            reviews: 589,
            badge: 'bestseller',
            inStock: true,
            description: 'Le parfum iconique féminin',
            volume: '100ml'
        },
        {
            id: 3,
            name: 'La Roche-Posay Effaclar Duo',
            brand: 'La Roche-Posay',
            category: 'skincare',
            price: 280,
            image: 'products/effaclar.jpg',
            rating: 4.6,
            reviews: 178,
            badge: 'new',
            inStock: true,
            description: 'Soin anti-imperfections',
            volume: '40ml'
        }
    ];
}

// ==================== UI Initialization ====================
function initializeUI() {
    // Sidebar navigation
    document.querySelectorAll('.menu-item[data-page]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            closeProductModal();
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
                logout();
            }
        });
    }

    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            openProductModal();
        });
    }

    // Product form submission
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
}

// Navigate to page
function navigateToPage(pageName) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[data-page="${pageName}"]`)?.classList.add('active');

    // Show page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}Page`)?.classList.add('active');
}

// ==================== Dashboard ====================
function renderDashboard() {
    // Update stats
    document.getElementById('totalProducts').textContent = products.length;

    // Render popular products
    const popularProductsContainer = document.getElementById('popularProducts');
    if (popularProductsContainer) {
        const topProducts = products
            .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
            .slice(0, 5);

        popularProductsContainer.innerHTML = topProducts.map(product => `
            <div class="popular-product-item">
                <img src="../assets/images/${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/50'">
                <div class="popular-product-info">
                    <h4>${product.name}</h4>
                    <p>${product.reviews || 0} ventes</p>
                </div>
                <div class="popular-product-price">${product.price} DH</div>
            </div>
        `).join('');
    }
}

// ==================== Products Management ====================
function renderProducts() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <p class="text-muted">Aucun produit disponible</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>#${product.id}</td>
            <td>
                <img src="../assets/images/${product.image}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/50'">
            </td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>${product.price} DH</td>
            <td>
                <span class="stock-badge ${product.inStock ? 'in-stock' : 'out-stock'}">
                    ${product.inStock ? 'En stock' : 'Rupture'}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="editProduct(${product.id})" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteProduct(${product.id})" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

// Open product modal
function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    const form = document.getElementById('productForm');
    const modalTitle = document.getElementById('productModalTitle');

    if (!modal || !form) return;

    // Reset form
    form.reset();
    currentEditingProduct = product;

    if (product) {
        // Edit mode
        modalTitle.textContent = 'Modifier le produit';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name || '';
        document.getElementById('productBrand').value = product.brand || '';
        document.getElementById('productCategory').value = product.category || '';
        document.getElementById('productBadge').value = product.badge || '';
        document.getElementById('productPrice').value = product.price || '';
        document.getElementById('productOriginalPrice').value = product.originalPrice || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productVolume').value = product.volume || '';
        document.getElementById('productRating').value = product.rating || 4.5;
        document.getElementById('productImage').value = product.image || '';
        document.getElementById('productInStock').checked = product.inStock !== false;
    } else {
        // Add mode
        modalTitle.textContent = 'Ajouter un produit';
        document.getElementById('productId').value = '';
        document.getElementById('productInStock').checked = true;
    }

    modal.classList.add('active');
    overlay.classList.add('active');
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');

    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');

    currentEditingProduct = null;
}

// Handle product form submission
function handleProductSubmit(e) {
    e.preventDefault();

    const productData = {
        id: document.getElementById('productId').value || Date.now(),
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        category: document.getElementById('productCategory').value,
        badge: document.getElementById('productBadge').value,
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
        description: document.getElementById('productDescription').value,
        volume: document.getElementById('productVolume').value,
        rating: parseFloat(document.getElementById('productRating').value) || 4.5,
        image: document.getElementById('productImage').value || 'products/placeholder.jpg',
        inStock: document.getElementById('productInStock').checked,
        reviews: currentEditingProduct ? currentEditingProduct.reviews : 0
    };

    if (currentEditingProduct) {
        // Update existing product
        const index = products.findIndex(p => p.id == productData.id);
        if (index !== -1) {
            products[index] = productData;
            showNotification('Produit modifié avec succès', 'success');
        }
    } else {
        // Add new product
        products.push(productData);
        showNotification('Produit ajouté avec succès', 'success');
    }

    // Save to localStorage (in production, this would be an API call)
    saveProducts();

    // Re-render
    renderProducts();
    renderDashboard();

    // Close modal
    closeProductModal();
}

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        openProductModal(product);
    }
}

// Delete product
function deleteProduct(productId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
        return;
    }

    products = products.filter(p => p.id != productId);
    saveProducts();
    renderProducts();
    renderDashboard();

    showNotification('Produit supprimé avec succès', 'success');
}

// Save products to localStorage
function saveProducts() {
    // In production, this would be an API call to save to the server
    // For now, we'll just update localStorage
    localStorage.setItem('silya-products', JSON.stringify(products));

    // Also try to update the JSON file (this won't work in browser, but shows intent)
    console.log('Products updated. In production, this would update the database.');
}

// ==================== Categories Management ====================
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-item">
            <i class="fas ${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description || ''}</p>
            <p class="text-muted">${getProductCountByCategory(category.id)} produits</p>
        </div>
    `).join('');
}

function getProductCountByCategory(categoryId) {
    return products.filter(p => p.category === categoryId).length;
}

// ==================== Notifications ====================
function showNotification(message, type = 'success') {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span style="font-size: 1.2em; margin-right: 10px;">${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        display: flex;
        align-items: center;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Search Functionality ====================
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            if (query) {
                const filteredProducts = products.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.brand?.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
                );

                // Temporarily update products for display
                const originalProducts = [...products];
                products = filteredProducts;
                renderProducts();
                products = originalProducts;
            } else {
                renderProducts();
            }
        }, 300);
    });
}

// ==================== Settings Form ====================
const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Paramètres sauvegardés avec succès', 'success');
    });
}

// ==================== Export Functions for Global Use ====================
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.closeProductModal = closeProductModal;

// ==================== Auto-save ====================
// Save products periodically (every 5 minutes)
setInterval(() => {
    if (products.length > 0) {
        saveProducts();
        console.log('Auto-save: Products saved');
    }
}, 5 * 60 * 1000);

// Save before page unload
window.addEventListener('beforeunload', () => {
    saveProducts();
});

// ==================== Statistics ====================
function updateStatistics() {
    // Calculate total revenue (example)
    const totalRevenue = products.reduce((sum, product) => {
        return sum + (product.price * (product.reviews || 0));
    }, 0);

    // Update dashboard stats
    // This is a simplified example; in production, you'd fetch real data
    console.log('Total estimated revenue:', totalRevenue, 'DH');
}

// Update statistics on load
updateStatistics();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        categories,
        renderProducts,
        renderCategories,
        renderDashboard
    };
}
