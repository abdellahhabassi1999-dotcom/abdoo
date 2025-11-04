/* ====================================
   Import/Export Data Management
   Professional Excel & JSON handling
   ==================================== */

let pendingImportData = null;
let pendingImportType = null;

// ==================== EXPORT FUNCTIONS ====================

/**
 * Export data in selected format (JSON, Excel, CSV)
 */
function exportData() {
    const dataType = document.getElementById('exportDataType').value;
    const format = document.getElementById('exportFormat').value;

    let data = {};
    const timestamp = new Date().toISOString().split('T')[0];

    // Gather data based on type
    switch (dataType) {
        case 'all':
            data = {
                products: JSON.parse(localStorage.getItem('silya-products')) || [],
                orders: JSON.parse(localStorage.getItem('silya-orders')) || [],
                customers: JSON.parse(localStorage.getItem('silya-customers')) || [],
                categories: JSON.parse(localStorage.getItem('silya-categories')) || [],
                settings: JSON.parse(localStorage.getItem('silya-settings')) || {}
            };
            break;
        case 'products':
            data.products = JSON.parse(localStorage.getItem('silya-products')) || [];
            break;
        case 'orders':
            data.orders = JSON.parse(localStorage.getItem('silya-orders')) || [];
            break;
        case 'customers':
            data.customers = JSON.parse(localStorage.getItem('silya-customers')) || [];
            break;
        case 'categories':
            data.categories = JSON.parse(localStorage.getItem('silya-categories')) || [];
            break;
    }

    // Export based on format
    switch (format) {
        case 'json':
            exportToJSON(data, `silya-${dataType}-${timestamp}.json`);
            break;
        case 'excel':
            exportToExcel(data, dataType, `silya-${dataType}-${timestamp}.xlsx`);
            break;
        case 'csv':
            exportToCSV(data, dataType, `silya-${dataType}-${timestamp}.csv`);
            break;
    }

    showNotification(`Export ${dataType} (${format.toUpperCase()}) réussi!`, 'success');
}

/**
 * Export data to JSON file
 */
function exportToJSON(data, filename) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadFile(blob, filename);
}

/**
 * Export data to Excel file
 */
function exportToExcel(data, dataType, filename) {
    const workbook = XLSX.utils.book_new();

    if (dataType === 'all') {
        // Create separate sheets for each data type
        if (data.products && data.products.length > 0) {
            const productsSheet = createProductsSheet(data.products);
            XLSX.utils.book_append_sheet(workbook, productsSheet, 'Produits');
        }
        if (data.orders && data.orders.length > 0) {
            const ordersSheet = createOrdersSheet(data.orders);
            XLSX.utils.book_append_sheet(workbook, ordersSheet, 'Commandes');
        }
        if (data.customers && data.customers.length > 0) {
            const customersSheet = createCustomersSheet(data.customers);
            XLSX.utils.book_append_sheet(workbook, customersSheet, 'Clients');
        }
        if (data.categories && data.categories.length > 0) {
            const categoriesSheet = createCategoriesSheet(data.categories);
            XLSX.utils.book_append_sheet(workbook, categoriesSheet, 'Catégories');
        }
    } else {
        // Single sheet for specific data type
        let sheet;
        const items = data[dataType] || [];

        switch (dataType) {
            case 'products':
                sheet = createProductsSheet(items);
                break;
            case 'orders':
                sheet = createOrdersSheet(items);
                break;
            case 'customers':
                sheet = createCustomersSheet(items);
                break;
            case 'categories':
                sheet = createCategoriesSheet(items);
                break;
        }

        if (sheet) {
            XLSX.utils.book_append_sheet(workbook, sheet, dataType.charAt(0).toUpperCase() + dataType.slice(1));
        }
    }

    // Write workbook to file
    XLSX.writeFile(workbook, filename);
}

/**
 * Create Excel sheet for products
 */
function createProductsSheet(products) {
    const data = products.map(p => ({
        'ID': p.id,
        'Nom': p.name,
        'Nom (EN)': p.nameEn || '',
        'Nom (AR)': p.nameAr || '',
        'Catégorie ID': p.category,
        'Prix': p.price,
        'Prix Original': p.originalPrice || '',
        'Description': p.description || '',
        'Image': p.image,
        'Badge': p.badge || '',
        'Note': p.rating || 0,
        'Avis': p.reviews || 0,
        'Stock': p.stock || 0,
        'Marque': p.brand || ''
    }));

    return XLSX.utils.json_to_sheet(data);
}

/**
 * Create Excel sheet for orders
 */
function createOrdersSheet(orders) {
    const data = orders.map(o => ({
        'ID Commande': o.id,
        'Date': new Date(o.date).toLocaleString('fr-FR'),
        'Client': o.customer.name,
        'Téléphone': o.customer.phone,
        'Email': o.customer.email,
        'Ville': o.customer.city,
        'Adresse': o.customer.address,
        'Produits': o.products.map(p => `${p.name} (x${p.quantity})`).join(', '),
        'Sous-total': o.subtotal,
        'Réduction': o.discount || 0,
        'Livraison': o.shipping,
        'Total': o.total,
        'Coupon': o.coupon || '',
        'Paiement': o.paymentMethod === 'cod' ? 'À la livraison' : 'Virement',
        'Statut': o.status,
        'Notes': o.notes || ''
    }));

    return XLSX.utils.json_to_sheet(data);
}

/**
 * Create Excel sheet for customers
 */
function createCustomersSheet(customers) {
    const data = customers.map(c => ({
        'ID': c.id,
        'Prénom': c.firstName,
        'Nom': c.lastName,
        'Email': c.email,
        'Téléphone': c.phone,
        'Adresse': c.address || '',
        'Ville': c.city || '',
        'Code Postal': c.postalCode || '',
        'Date Inscription': new Date(c.registeredDate).toLocaleDateString('fr-FR'),
        'Total Commandes': c.totalOrders || 0,
        'Total Dépensé': c.totalSpent || 0,
        'Notes': c.notes || ''
    }));

    return XLSX.utils.json_to_sheet(data);
}

/**
 * Create Excel sheet for categories
 */
function createCategoriesSheet(categories) {
    const data = categories.map(c => ({
        'ID': c.id,
        'Nom (FR)': c.name,
        'Nom (EN)': c.nameEn || '',
        'Nom (AR)': c.nameAr || '',
        'Icône': c.icon,
        'Image': c.image || '',
        'Description': c.description || ''
    }));

    return XLSX.utils.json_to_sheet(data);
}

/**
 * Export data to CSV file
 */
function exportToCSV(data, dataType, filename) {
    let csvContent = '';
    const items = data[dataType] || [];

    if (items.length === 0) {
        showNotification('Aucune donnée à exporter', 'warning');
        return;
    }

    // Get headers from first item
    const headers = Object.keys(items[0]);
    csvContent += headers.join(',') + '\n';

    // Add rows
    items.forEach(item => {
        const row = headers.map(header => {
            let value = item[header];

            // Handle objects and arrays
            if (typeof value === 'object' && value !== null) {
                value = JSON.stringify(value);
            }

            // Escape commas and quotes
            value = String(value || '').replace(/"/g, '""');

            return `"${value}"`;
        });

        csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, filename);
}

// ==================== IMPORT FUNCTIONS ====================

/**
 * Handle file import
 */
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const importType = document.getElementById('importDataType').value;

    if (fileExtension === 'json') {
        readJSONFile(file, importType);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        readExcelFile(file, importType);
    } else if (fileExtension === 'csv') {
        readCSVFile(file, importType);
    } else {
        showNotification('Format de fichier non supporté', 'error');
    }
}

/**
 * Read JSON file
 */
function readJSONFile(file, importType) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            validateAndPreviewImport(data, importType);
        } catch (error) {
            showNotification('Erreur de lecture du fichier JSON: ' + error.message, 'error');
        }
    };

    reader.readAsText(file);
}

/**
 * Read Excel file
 */
function readExcelFile(file, importType) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            let importData = {};

            if (importType === 'all') {
                // Read all sheets
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    // Map sheet names to data types
                    const dataTypeMap = {
                        'Produits': 'products',
                        'Products': 'products',
                        'Commandes': 'orders',
                        'Orders': 'orders',
                        'Clients': 'customers',
                        'Customers': 'customers',
                        'Catégories': 'categories',
                        'Categories': 'categories'
                    };

                    const dataType = dataTypeMap[sheetName] || sheetName.toLowerCase();
                    importData[dataType] = parseExcelData(jsonData, dataType);
                });
            } else {
                // Read first sheet for specific type
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                importData[importType] = parseExcelData(jsonData, importType);
            }

            validateAndPreviewImport(importData, importType);
        } catch (error) {
            showNotification('Erreur de lecture du fichier Excel: ' + error.message, 'error');
        }
    };

    reader.readAsArrayBuffer(file);
}

/**
 * Parse Excel data to match our data structure
 */
function parseExcelData(data, dataType) {
    switch (dataType) {
        case 'products':
            return data.map(row => ({
                id: row['ID'] || Date.now() + Math.random(),
                name: row['Nom'],
                nameEn: row['Nom (EN)'] || '',
                nameAr: row['Nom (AR)'] || '',
                category: row['Catégorie ID'],
                price: parseFloat(row['Prix']),
                originalPrice: row['Prix Original'] ? parseFloat(row['Prix Original']) : null,
                description: row['Description'] || '',
                image: row['Image'],
                badge: row['Badge'] || '',
                rating: parseFloat(row['Note']) || 0,
                reviews: parseInt(row['Avis']) || 0,
                stock: parseInt(row['Stock']) || 0,
                brand: row['Marque'] || ''
            }));

        case 'customers':
            return data.map(row => ({
                id: row['ID'] || 'CUST-' + Date.now(),
                firstName: row['Prénom'],
                lastName: row['Nom'],
                email: row['Email'],
                phone: row['Téléphone'],
                address: row['Adresse'] || '',
                city: row['Ville'] || '',
                postalCode: row['Code Postal'] || '',
                registeredDate: row['Date Inscription'] || new Date().toISOString(),
                totalOrders: parseInt(row['Total Commandes']) || 0,
                totalSpent: parseFloat(row['Total Dépensé']) || 0,
                notes: row['Notes'] || ''
            }));

        case 'categories':
            return data.map(row => ({
                id: row['ID'] || Date.now(),
                name: row['Nom (FR)'],
                nameEn: row['Nom (EN)'] || '',
                nameAr: row['Nom (AR)'] || '',
                icon: row['Icône'],
                image: row['Image'] || '',
                description: row['Description'] || ''
            }));

        default:
            return data;
    }
}

/**
 * Read CSV file
 */
function readCSVFile(file, importType) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const csvData = e.target.result;
            const workbook = XLSX.read(csvData, { type: 'string' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            const importData = {};
            importData[importType] = parseExcelData(jsonData, importType);

            validateAndPreviewImport(importData, importType);
        } catch (error) {
            showNotification('Erreur de lecture du fichier CSV: ' + error.message, 'error');
        }
    };

    reader.readAsText(file);
}

/**
 * Validate and preview import data
 */
function validateAndPreviewImport(data, importType) {
    // Store for later confirmation
    pendingImportData = data;
    pendingImportType = importType;

    // Show preview
    const previewDiv = document.getElementById('importPreview');
    const previewContent = document.getElementById('importPreviewContent');

    let previewHTML = '<div style="font-family: monospace;">';

    if (importType === 'all') {
        Object.keys(data).forEach(key => {
            const items = data[key];
            if (Array.isArray(items) && items.length > 0) {
                previewHTML += `<h6 style="margin-top: 15px;"><strong>${key}:</strong> ${items.length} élément(s)</h6>`;
                previewHTML += `<pre style="background: white; padding: 10px; border-radius: 4px; max-height: 150px; overflow-y: auto;">${JSON.stringify(items.slice(0, 3), null, 2)}</pre>`;
                if (items.length > 3) {
                    previewHTML += `<p style="color: #666; font-size: 0.9em;">... et ${items.length - 3} autres</p>`;
                }
            }
        });
    } else {
        const items = data[importType] || [];
        previewHTML += `<h6><strong>${importType}:</strong> ${items.length} élément(s)</h6>`;
        if (items.length > 0) {
            previewHTML += `<pre style="background: white; padding: 10px; border-radius: 4px; max-height: 300px; overflow-y: auto;">${JSON.stringify(items.slice(0, 5), null, 2)}</pre>`;
            if (items.length > 5) {
                previewHTML += `<p style="color: #666; font-size: 0.9em;">... et ${items.length - 5} autres</p>`;
            }
        }
    }

    previewHTML += '</div>';

    previewContent.innerHTML = previewHTML;
    previewDiv.style.display = 'block';
}

/**
 * Confirm and execute import
 */
function confirmImport() {
    if (!pendingImportData) {
        showNotification('Aucune donnée à importer', 'error');
        return;
    }

    const importAction = document.getElementById('importAction').value;

    try {
        if (pendingImportType === 'all') {
            // Import all data types
            Object.keys(pendingImportData).forEach(key => {
                importDataToLocalStorage(key, pendingImportData[key], importAction);
            });
        } else {
            // Import specific data type
            importDataToLocalStorage(pendingImportType, pendingImportData[pendingImportType], importAction);
        }

        showNotification('Importation réussie!', 'success');
        cancelImport();

        // Refresh the current page data
        location.reload();
    } catch (error) {
        showNotification('Erreur lors de l\'importation: ' + error.message, 'error');
    }
}

/**
 * Import data to localStorage
 */
function importDataToLocalStorage(dataType, newData, action) {
    const storageKey = `silya-${dataType}`;

    if (action === 'replace') {
        // Replace existing data
        localStorage.setItem(storageKey, JSON.stringify(newData));
    } else if (action === 'merge') {
        // Merge with existing data
        const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];

        // For arrays, merge by ID
        if (Array.isArray(newData) && Array.isArray(existingData)) {
            const mergedData = [...existingData];

            newData.forEach(newItem => {
                const existingIndex = mergedData.findIndex(item => item.id === newItem.id);

                if (existingIndex >= 0) {
                    // Update existing item
                    mergedData[existingIndex] = newItem;
                } else {
                    // Add new item
                    mergedData.push(newItem);
                }
            });

            localStorage.setItem(storageKey, JSON.stringify(mergedData));
        } else {
            // For objects, merge properties
            const merged = { ...existingData, ...newData };
            localStorage.setItem(storageKey, JSON.stringify(merged));
        }
    }
}

/**
 * Cancel import
 */
function cancelImport() {
    pendingImportData = null;
    pendingImportType = null;
    document.getElementById('importPreview').style.display = 'none';
    document.getElementById('importFileInput').value = '';
}

// ==================== TEMPLATE & UTILITY FUNCTIONS ====================

/**
 * Download template Excel file
 */
function downloadTemplate() {
    const importType = document.getElementById('importDataType').value;

    const workbook = XLSX.utils.book_new();
    let templateData = [];
    let sheetName = 'Template';

    switch (importType) {
        case 'products':
            templateData = [{
                'ID': 1,
                'Nom': 'Exemple Produit',
                'Nom (EN)': 'Example Product',
                'Nom (AR)': 'منتج مثال',
                'Catégorie ID': 1,
                'Prix': 299,
                'Prix Original': 399,
                'Description': 'Description du produit',
                'Image': 'products/example.jpg',
                'Badge': 'new',
                'Note': 4.5,
                'Avis': 10,
                'Stock': 50,
                'Marque': 'Brand Name'
            }];
            sheetName = 'Produits';
            break;

        case 'customers':
            templateData = [{
                'ID': 'CUST-001',
                'Prénom': 'Ahmed',
                'Nom': 'Alami',
                'Email': 'ahmed@example.com',
                'Téléphone': '+212600000000',
                'Adresse': '123 Rue Example',
                'Ville': 'Kénitra',
                'Code Postal': '14000',
                'Date Inscription': '2024-01-01',
                'Total Commandes': 5,
                'Total Dépensé': 1500,
                'Notes': 'Client fidèle'
            }];
            sheetName = 'Clients';
            break;

        case 'categories':
            templateData = [{
                'ID': 1,
                'Nom (FR)': 'Parfums',
                'Nom (EN)': 'Perfumes',
                'Nom (AR)': 'عطور',
                'Icône': 'fa-flask',
                'Image': 'categories/perfumes.jpg',
                'Description': 'Collection de parfums'
            }];
            sheetName = 'Catégories';
            break;

        default:
            showNotification('Type de données non supporté', 'error');
            return;
    }

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `template-${importType}.xlsx`);

    showNotification('Modèle téléchargé avec succès!', 'success');
}

/**
 * Backup all data to JSON
 */
function backupAllData() {
    const allData = {
        products: JSON.parse(localStorage.getItem('silya-products')) || [],
        orders: JSON.parse(localStorage.getItem('silya-orders')) || [],
        customers: JSON.parse(localStorage.getItem('silya-customers')) || [],
        categories: JSON.parse(localStorage.getItem('silya-categories')) || [],
        settings: JSON.parse(localStorage.getItem('silya-settings')) || {},
        backupDate: new Date().toISOString()
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    exportToJSON(allData, `silya-backup-${timestamp}.json`);
    showNotification('Sauvegarde complète créée!', 'success');
}

/**
 * Clear all data with confirmation
 */
function clearAllData() {
    if (!confirm('⚠️ ATTENTION: Cette action supprimera TOUTES les données (produits, commandes, clients, catégories).\n\nÊtes-vous absolument sûr?')) {
        return;
    }

    if (!confirm('Dernière confirmation: Toutes les données seront définitivement perdues. Continuer?')) {
        return;
    }

    localStorage.removeItem('silya-products');
    localStorage.removeItem('silya-orders');
    localStorage.removeItem('silya-customers');
    localStorage.removeItem('silya-categories');
    localStorage.removeItem('silya-settings');

    showNotification('Toutes les données ont été supprimées', 'info');
    location.reload();
}

/**
 * Download file helper
 */
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
