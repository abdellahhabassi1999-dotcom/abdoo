/* ====================================
   Silya's Parfumerie - Enhanced Admin Features
   Orders, Customers, Categories, Settings
   ==================================== */

// ==================== Global Data ====================
let orders = [];
let customers = [];
let settings = {};
let currentEditingOrder = null;
let currentEditingCustomer = null;
let currentEditingCategory = null;

// ==================== Initialize Enhanced Features ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load all data
    loadOrders();
    loadCustomers();
    loadSettings();

    // Initialize event listeners
    initializeEnhancedUI();
});

// ==================== Load Data ====================
function loadOrders() {
    const savedOrders = localStorage.getItem('silya-orders');
    if (savedOrders) {
        try {
            orders = JSON.parse(savedOrders);
        } catch (e) {
            console.error('Failed to parse orders');
            orders = getSampleOrders();
        }
    } else {
        orders = getSampleOrders();
    }
    renderOrders();
    updateOrderStats();
}

function loadCustomers() {
    const savedCustomers = localStorage.getItem('silya-customers');
    if (savedCustomers) {
        try {
            customers = JSON.parse(savedCustomers);
        } catch (e) {
            console.error('Failed to parse customers');
            customers = getSampleCustomers();
        }
    } else {
        customers = getSampleCustomers();
    }
    renderCustomers();
    updateCustomerStats();
}

function loadSettings() {
    const savedSettings = localStorage.getItem('silya-settings');
    if (savedSettings) {
        try {
            settings = JSON.parse(savedSettings);
            applySettings();
        } catch (e) {
            console.error('Failed to parse settings');
            settings = getDefaultSettings();
        }
    } else {
        settings = getDefaultSettings();
    }
}

// ==================== Sample Data ====================
function getSampleOrders() {
    return [
        {
            id: 'ORD-001',
            customer: { name: 'Fatima El Amrani', email: 'fatima@example.com', phone: '+212 6XX XXX XXX' },
            date: new Date().toISOString(),
            products: [
                { name: 'Dior Sauvage', quantity: 1, price: 1200 },
                { name: 'Chanel N°5', quantity: 1, price: 1800 }
            ],
            total: 3000,
            status: 'pending',
            shippingAddress: 'Rabat, Morocco',
            notes: 'Livraison urgente'
        },
        {
            id: 'ORD-002',
            customer: { name: 'Ahmed Benali', email: 'ahmed@example.com', phone: '+212 6XX XXX XXX' },
            date: new Date(Date.now() - 86400000).toISOString(),
            products: [
                { name: 'La Roche-Posay Effaclar', quantity: 2, price: 280 }
            ],
            total: 560,
            status: 'processing',
            shippingAddress: 'Casablanca, Morocco'
        },
        {
            id: 'ORD-003',
            customer: { name: 'Samira Idrissi', email: 'samira@example.com', phone: '+212 6XX XXX XXX' },
            date: new Date(Date.now() - 172800000).toISOString(),
            products: [
                { name: 'Lancôme Hypnôse', quantity: 1, price: 320 },
                { name: 'MAC Ruby Woo', quantity: 2, price: 280 }
            ],
            total: 880,
            status: 'completed',
            shippingAddress: 'Marrakech, Morocco'
        }
    ];
}

function getSampleCustomers() {
    return [
        {
            id: 1,
            firstName: 'Fatima',
            lastName: 'El Amrani',
            email: 'fatima@example.com',
            phone: '+212 661 234 567',
            address: 'Avenue Hassan II, Appartement 15',
            city: 'Rabat',
            postalCode: '10000',
            orders: 5,
            totalSpent: 4500,
            joinDate: '2024-01-15',
            notes: 'Cliente fidèle'
        },
        {
            id: 2,
            firstName: 'Ahmed',
            lastName: 'Benali',
            email: 'ahmed@example.com',
            phone: '+212 662 345 678',
            address: 'Boulevard Mohamed V',
            city: 'Casablanca',
            postalCode: '20000',
            orders: 3,
            totalSpent: 2100,
            joinDate: '2024-02-20'
        },
        {
            id: 3,
            firstName: 'Samira',
            lastName: 'Idrissi',
            email: 'samira@example.com',
            phone: '+212 663 456 789',
            address: 'Quartier Guéliz',
            city: 'Marrakech',
            postalCode: '40000',
            orders: 8,
            totalSpent: 6200,
            joinDate: '2023-11-05',
            notes: 'Préfère les produits de luxe'
        }
    ];
}

function getDefaultSettings() {
    return {
        storeName: "Silya's Parfumerie",
        storeTagline: "Beauté & Élégance",
        storeEmail: "contact@silyasparfumerie.ma",
        storePhone: "+212 766 985 350",
        storeAddress: "Kénitra Mall, 1er étage, Magasin n°82, Kénitra",
        freeShippingThreshold: 500,
        shippingFee: 30,
        deliveryTime: "2-5 jours ouvrables",
        instagramUrl: "https://instagram.com/silya_parfumerie",
        facebookUrl: "https://facebook.com/silyasparfumerie",
        tiktokUrl: "https://tiktok.com/@silya_parfumerie"
    };
}

// ==================== Orders Management ====================
function renderOrders(filter = 'all') {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    let filteredOrders = orders;

    // Apply status filter
    if (filter !== 'all') {
        filteredOrders = orders.filter(order => order.status === filter);
    }

    if (filteredOrders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Aucune commande</h3>
                    <p>Les commandes apparaîtront ici</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredOrders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer.name}</td>
            <td>${new Date(order.date).toLocaleDateString('fr-FR')}</td>
            <td>${order.products.length} article(s)</td>
            <td><strong>${order.total} DH</strong></td>
            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="viewOrderDetails('${order.id}')" title="Voir détails">
                        <i class="fas fa-eye"></i>
                    </button>
                    <select class="form-control" style="width: 120px; padding: 5px; font-size: 0.85rem;" onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>En attente</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>En cours</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Livrée</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Annulée</option>
                    </select>
                    <button class="btn-icon delete" onclick="deleteOrder('${order.id}')" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getStatusText(status) {
    const statusTexts = {
        pending: 'En attente',
        processing: 'En cours',
        completed: 'Livrée',
        cancelled: 'Annulée'
    };
    return statusTexts[status] || status;
}

function updateOrderStats() {
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const processingCount = orders.filter(o => o.status === 'processing').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);

    document.getElementById('pendingOrders').textContent = pendingCount;
    document.getElementById('processingOrders').textContent = processingCount;
    document.getElementById('completedOrders').textContent = completedCount;
    document.getElementById('totalRevenue').textContent = `${totalRevenue.toLocaleString()} DH`;
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrders();
        updateOrderStats();
        showNotification(`Commande ${orderId} mise à jour`, 'success');
    }
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('orderModal');
    const content = document.getElementById('orderDetailsContent');

    content.innerHTML = `
        <div class="order-details-section">
            <h4>Informations Commande</h4>
            <div class="order-info-grid">
                <div class="order-info-item">
                    <label>N° Commande:</label>
                    <span>${order.id}</span>
                </div>
                <div class="order-info-item">
                    <label>Date:</label>
                    <span>${new Date(order.date).toLocaleString('fr-FR')}</span>
                </div>
                <div class="order-info-item">
                    <label>Statut:</label>
                    <span class="status-badge ${order.status}">${getStatusText(order.status)}</span>
                </div>
                <div class="order-info-item">
                    <label>Total:</label>
                    <span><strong>${order.total} DH</strong></span>
                </div>
            </div>
        </div>

        <div class="order-details-section">
            <h4>Client</h4>
            <div class="order-info-grid">
                <div class="order-info-item">
                    <label>Nom:</label>
                    <span>${order.customer.name}</span>
                </div>
                <div class="order-info-item">
                    <label>Email:</label>
                    <span>${order.customer.email}</span>
                </div>
                <div class="order-info-item">
                    <label>Téléphone:</label>
                    <span>${order.customer.phone}</span>
                </div>
                <div class="order-info-item">
                    <label>Adresse:</label>
                    <span>${order.shippingAddress || 'Non spécifiée'}</span>
                </div>
            </div>
        </div>

        <div class="order-details-section">
            <h4>Produits</h4>
            <div class="order-products-list">
                ${order.products.map(product => `
                    <div class="order-product-item">
                        <div>
                            <strong>${product.name}</strong><br>
                            <small>Quantité: ${product.quantity}</small>
                        </div>
                        <div><strong>${product.price * product.quantity} DH</strong></div>
                    </div>
                `).join('')}
                <div class="order-total">
                    <span>Total:</span>
                    <span>${order.total} DH</span>
                </div>
            </div>
        </div>

        ${order.notes ? `
            <div class="order-details-section">
                <h4>Notes</h4>
                <p>${order.notes}</p>
            </div>
        ` : ''}

        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" onclick="printOrder('${order.id}')">
                <i class="fas fa-print"></i> Imprimer
            </button>
            <button class="btn btn-secondary" onclick="closeOrderModal()">
                Fermer
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function deleteOrder(orderId) {
    if (!confirm(`Supprimer la commande ${orderId} ?`)) return;

    orders = orders.filter(o => o.id !== orderId);
    saveOrders();
    renderOrders();
    updateOrderStats();
    showNotification('Commande supprimée', 'success');
}

function saveOrders() {
    localStorage.setItem('silya-orders', JSON.stringify(orders));
}

// ==================== Customers Management ====================
function renderCustomers() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;

    if (customers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>Aucun client</h3>
                    <p>Les clients apparaîtront ici</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>#${customer.id}</td>
            <td><strong>${customer.firstName} ${customer.lastName}</strong></td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.city || '-'}</td>
            <td>${customer.orders || 0}</td>
            <td><strong>${customer.totalSpent || 0} DH</strong></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="editCustomer(${customer.id})" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteCustomer(${customer.id})" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateCustomerStats() {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.orders > 0).length;
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newCustomers = customers.filter(c => new Date(c.joinDate) > thirtyDaysAgo).length;

    document.getElementById('totalCustomers').textContent = totalCustomers;
    document.getElementById('activeCustomers').textContent = activeCustomers;
    document.getElementById('newCustomers').textContent = newCustomers;
}

function openCustomerModal(customer = null) {
    const modal = document.getElementById('customerModal');
    const form = document.getElementById('customerForm');
    const title = document.getElementById('customerModalTitle');

    form.reset();
    currentEditingCustomer = customer;

    if (customer) {
        title.textContent = 'Modifier le client';
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customerFirstName').value = customer.firstName || '';
        document.getElementById('customerLastName').value = customer.lastName || '';
        document.getElementById('customerEmail').value = customer.email || '';
        document.getElementById('customerPhone').value = customer.phone || '';
        document.getElementById('customerAddress').value = customer.address || '';
        document.getElementById('customerCity').value = customer.city || '';
        document.getElementById('customerPostalCode').value = customer.postalCode || '';
        document.getElementById('customerNotes').value = customer.notes || '';
    } else {
        title.textContent = 'Ajouter un client';
    }

    modal.classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeCustomerModal() {
    document.getElementById('customerModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    currentEditingCustomer = null;
}

function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        openCustomerModal(customer);
    }
}

function handleCustomerSubmit(e) {
    e.preventDefault();

    const customerData = {
        id: document.getElementById('customerId').value || Date.now(),
        firstName: document.getElementById('customerFirstName').value,
        lastName: document.getElementById('customerLastName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        city: document.getElementById('customerCity').value,
        postalCode: document.getElementById('customerPostalCode').value,
        notes: document.getElementById('customerNotes').value,
        joinDate: currentEditingCustomer ? currentEditingCustomer.joinDate : new Date().toISOString(),
        orders: currentEditingCustomer ? currentEditingCustomer.orders : 0,
        totalSpent: currentEditingCustomer ? currentEditingCustomer.totalSpent : 0
    };

    if (currentEditingCustomer) {
        const index = customers.findIndex(c => c.id == customerData.id);
        if (index !== -1) {
            customers[index] = customerData;
            showNotification('Client modifié avec succès', 'success');
        }
    } else {
        customers.push(customerData);
        showNotification('Client ajouté avec succès', 'success');
    }

    saveCustomers();
    renderCustomers();
    updateCustomerStats();
    closeCustomerModal();
}

function deleteCustomer(customerId) {
    if (!confirm('Supprimer ce client ?')) return;

    customers = customers.filter(c => c.id !== customerId);
    saveCustomers();
    renderCustomers();
    updateCustomerStats();
    showNotification('Client supprimé', 'success');
}

function saveCustomers() {
    localStorage.setItem('silya-customers', JSON.stringify(customers));
}

// ==================== Categories Management ====================
function openCategoryModal(category = null) {
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    const title = document.getElementById('categoryModalTitle');

    form.reset();
    currentEditingCategory = category;

    if (category) {
        title.textContent = 'Modifier la catégorie';
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name || '';
        document.getElementById('categoryNameEn').value = category.nameEn || '';
        document.getElementById('categoryNameAr').value = category.nameAr || '';
        document.getElementById('categoryIcon').value = category.icon || '';
        document.getElementById('categoryImage').value = category.image || '';
        document.getElementById('categoryDescription').value = category.description || '';
    } else {
        title.textContent = 'Ajouter une catégorie';
    }

    modal.classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    currentEditingCategory = null;
}

function handleCategorySubmit(e) {
    e.preventDefault();

    const categoryData = {
        id: document.getElementById('categoryId').value || generateCategoryId(),
        name: document.getElementById('categoryName').value,
        nameEn: document.getElementById('categoryNameEn').value,
        nameAr: document.getElementById('categoryNameAr').value,
        icon: document.getElementById('categoryIcon').value,
        image: document.getElementById('categoryImage').value,
        description: document.getElementById('categoryDescription').value
    };

    if (currentEditingCategory) {
        const index = categories.findIndex(c => c.id === categoryData.id);
        if (index !== -1) {
            categories[index] = categoryData;
            showNotification('Catégorie modifiée avec succès', 'success');
        }
    } else {
        categories.push(categoryData);
        showNotification('Catégorie ajoutée avec succès', 'success');
    }

    saveCategories();
    renderCategories();
    closeCategoryModal();
}

function generateCategoryId() {
    return document.getElementById('categoryName').value.toLowerCase().replace(/\s+/g, '-');
}

function deleteCategory(categoryId) {
    if (!confirm('Supprimer cette catégorie ?')) return;

    categories = categories.filter(c => c.id !== categoryId);
    saveCategories();
    renderCategories();
    showNotification('Catégorie supprimée', 'success');
}

function saveCategories() {
    localStorage.setItem('silya-categories', JSON.stringify(categories));
}

// Update renderCategories to include edit/delete buttons
const originalRenderCategories = window.renderCategories;
window.renderCategories = function() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-item">
            <div class="category-actions">
                <button class="btn-icon edit" onclick="openCategoryModal(${JSON.stringify(category).replace(/"/g, '&quot;')})" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteCategory('${category.id}')" title="Supprimer">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <i class="fas ${category.icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description || ''}</p>
            <p class="text-muted">${getProductCountByCategory(category.id)} produits</p>
        </div>
    `).join('');
};

// ==================== Settings Management ====================
function applySettings() {
    // Apply loaded settings to form fields
    if (document.getElementById('storeName')) {
        document.getElementById('storeName').value = settings.storeName || '';
        document.getElementById('storeTagline').value = settings.storeTagline || '';
        document.getElementById('storeEmail').value = settings.storeEmail || '';
        document.getElementById('storePhone').value = settings.storePhone || '';
        document.getElementById('storeAddress').value = settings.storeAddress || '';
        document.getElementById('freeShippingThreshold').value = settings.freeShippingThreshold || 500;
        document.getElementById('shippingFee').value = settings.shippingFee || 30;
        document.getElementById('deliveryTime').value = settings.deliveryTime || '';
        document.getElementById('instagramUrl').value = settings.instagramUrl || '';
        document.getElementById('facebookUrl').value = settings.facebookUrl || '';
        document.getElementById('tiktokUrl').value = settings.tiktokUrl || '';
    }
}

function saveSettings() {
    localStorage.setItem('silya-settings', JSON.stringify(settings));
}

function handleGeneralSettingsSubmit(e) {
    e.preventDefault();

    settings.storeName = document.getElementById('storeName').value;
    settings.storeTagline = document.getElementById('storeTagline').value;
    settings.storeEmail = document.getElementById('storeEmail').value;
    settings.storePhone = document.getElementById('storePhone').value;
    settings.storeAddress = document.getElementById('storeAddress').value;

    saveSettings();
    showNotification('Paramètres généraux sauvegardés', 'success');
}

function handleShippingSettingsSubmit(e) {
    e.preventDefault();

    settings.freeShippingThreshold = parseInt(document.getElementById('freeShippingThreshold').value);
    settings.shippingFee = parseInt(document.getElementById('shippingFee').value);
    settings.deliveryTime = document.getElementById('deliveryTime').value;

    saveSettings();
    showNotification('Paramètres de livraison sauvegardés', 'success');
}

function handleSocialSettingsSubmit(e) {
    e.preventDefault();

    settings.instagramUrl = document.getElementById('instagramUrl').value;
    settings.facebookUrl = document.getElementById('facebookUrl').value;
    settings.tiktokUrl = document.getElementById('tiktokUrl').value;

    saveSettings();
    showNotification('Réseaux sociaux sauvegardés', 'success');
}

// ==================== Export/Import ====================
function exportAllData() {
    const allData = {
        products: products,
        categories: categories,
        orders: orders,
        customers: customers,
        settings: settings,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `silya-parfumerie-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showNotification('Données exportées avec succès', 'success');
}

function importData() {
    document.getElementById('importFileInput').click();
}

function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);

            if (confirm('Importer ces données ? Cela remplacera toutes les données actuelles.')) {
                if (data.products) products = data.products;
                if (data.categories) categories = data.categories;
                if (data.orders) orders = data.orders;
                if (data.customers) customers = data.customers;
                if (data.settings) settings = data.settings;

                // Save all data
                localStorage.setItem('silya-products', JSON.stringify(products));
                localStorage.setItem('silya-categories', JSON.stringify(categories));
                saveOrders();
                saveCustomers();
                saveSettings();

                // Re-render everything
                renderProducts();
                renderCategories();
                renderOrders();
                renderCustomers();
                renderDashboard();
                applySettings();

                showNotification('Données importées avec succès', 'success');
            }
        } catch (err) {
            showNotification('Erreur lors de l\'import: fichier invalide', 'error');
        }
    };
    reader.readAsText(file);
}

function backupData() {
    exportAllData();
    showNotification('Sauvegarde créée', 'success');
}

function clearAllData() {
    if (!confirm('⚠️ ATTENTION: Supprimer TOUTES les données ? Cette action est irréversible!')) return;
    if (!confirm('Êtes-vous VRAIMENT sûr? Toutes les données seront perdues!')) return;

    localStorage.removeItem('silya-products');
    localStorage.removeItem('silya-categories');
    localStorage.removeItem('silya-orders');
    localStorage.removeItem('silya-customers');
    localStorage.removeItem('silya-settings');

    showNotification('Toutes les données ont été supprimées', 'warning');

    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

// ==================== Enhanced UI Initialization ====================
function initializeEnhancedUI() {
    // Order filters
    const orderStatusFilter = document.getElementById('orderStatusFilter');
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', (e) => {
            renderOrders(e.target.value);
        });
    }

    // Add customer button
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    if (addCustomerBtn) {
        addCustomerBtn.addEventListener('click', () => openCustomerModal());
    }

    // Add category button
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => openCategoryModal());
    }

    // Customer form
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', handleCustomerSubmit);
    }

    // Category form
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', handleCategorySubmit);
    }

    // Settings forms
    const generalSettingsForm = document.getElementById('generalSettingsForm');
    if (generalSettingsForm) {
        generalSettingsForm.addEventListener('submit', handleGeneralSettingsSubmit);
    }

    const shippingSettingsForm = document.getElementById('shippingSettingsForm');
    if (shippingSettingsForm) {
        shippingSettingsForm.addEventListener('submit', handleShippingSettingsSubmit);
    }

    const socialSettingsForm = document.getElementById('socialSettingsForm');
    if (socialSettingsForm) {
        socialSettingsForm.addEventListener('submit', handleSocialSettingsSubmit);
    }

    // Export/Import buttons
    const exportAllDataBtn = document.getElementById('exportAllDataBtn');
    if (exportAllDataBtn) {
        exportAllDataBtn.addEventListener('click', exportAllData);
    }

    const importDataBtn = document.getElementById('importDataBtn');
    if (importDataBtn) {
        importDataBtn.addEventListener('click', importData);
    }

    const backupDataBtn = document.getElementById('backupDataBtn');
    if (backupDataBtn) {
        backupDataBtn.addEventListener('click', backupData);
    }

    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', clearAllData);
    }

    const importFileInput = document.getElementById('importFileInput');
    if (importFileInput) {
        importFileInput.addEventListener('change', handleImportFile);
    }

    const exportOrdersBtn = document.getElementById('exportOrdersBtn');
    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener('click', () => {
            const dataStr = JSON.stringify(orders, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `orders-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
            showNotification('Commandes exportées', 'success');
        });
    }

    const exportCustomersBtn = document.getElementById('exportCustomersBtn');
    if (exportCustomersBtn) {
        exportCustomersBtn.addEventListener('click', () => {
            const dataStr = JSON.stringify(customers, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `customers-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
            showNotification('Clients exportés', 'success');
        });
    }
}

// Print order function
function printOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Commande ${order.id}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #C8A882; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #C8A882; color: white; }
                .total { font-size: 1.2em; font-weight: bold; text-align: right; }
            </style>
        </head>
        <body>
            <h1>Silya's Parfumerie</h1>
            <h2>Commande ${order.id}</h2>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleString('fr-FR')}</p>
            <p><strong>Client:</strong> ${order.customer.name}</p>
            <p><strong>Téléphone:</strong> ${order.customer.phone}</p>
            <p><strong>Adresse:</strong> ${order.shippingAddress}</p>

            <h3>Produits</h3>
            <table>
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.products.map(p => `
                        <tr>
                            <td>${p.name}</td>
                            <td>${p.quantity}</td>
                            <td>${p.price} DH</td>
                            <td>${p.price * p.quantity} DH</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <p class="total">Total: ${order.total} DH</p>
            ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Export functions to global scope
window.viewOrderDetails = viewOrderDetails;
window.closeOrderModal = closeOrderModal;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;
window.closeCustomerModal = closeCustomerModal;
window.openCategoryModal = openCategoryModal;
window.closeCategoryModal = closeCategoryModal;
window.deleteCategory = deleteCategory;
window.printOrder = printOrder;
