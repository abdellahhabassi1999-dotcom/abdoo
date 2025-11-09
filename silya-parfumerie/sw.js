/* ====================================
   Service Worker - Progressive Web App
   Silya's Parfumerie
   ==================================== */

const CACHE_NAME = 'silya-parfumerie-v1.0.0';
const RUNTIME_CACHE = 'silya-runtime-v1.0.0';

// Assets to cache immediately
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/css/responsive.css',
    '/assets/css/utilities.css',
    '/assets/js/script.js',
    '/assets/js/data.js',
    '/assets/js/utils.js',
    '/assets/js/translations.js',
    '/config/whatsapp-config.js',
    '/config/site-config.js',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error('Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME && cache !== RUNTIME_CACHE) {
                            console.log('Service Worker: Deleting old cache:', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip cross-origin requests
    if (!request.url.startsWith(self.location.origin)) {
        // For external resources, use network-first strategy
        event.respondWith(networkFirst(request));
        return;
    }

    // For same-origin requests, use cache-first strategy
    event.respondWith(cacheFirst(request));
});

// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) {
        console.log('Service Worker: Serving from cache:', request.url);
        return cached;
    }

    try {
        const response = await fetch(request);

        // Cache successful responses
        if (response && response.status === 200) {
            const responseClone = response.clone();
            const runtimeCache = await caches.open(RUNTIME_CACHE);
            await runtimeCache.put(request, responseClone);
        }

        return response;
    } catch (error) {
        console.error('Service Worker: Fetch failed:', error);

        // Return offline page if available
        if (request.mode === 'navigate') {
            const offlinePage = await cache.match('/offline.html');
            if (offlinePage) return offlinePage;
        }

        throw error;
    }
}

// Network-first strategy
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const response = await fetch(request);

        // Cache successful responses
        if (response && response.status === 200) {
            const responseClone = response.clone();
            await cache.put(request, responseClone);
        }

        return response;
    } catch (error) {
        console.log('Service Worker: Network failed, trying cache:', request.url);
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        throw error;
    }
}

// Background sync for offline orders
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync:', event.tag);

    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOrders());
    }
});

async function syncOrders() {
    try {
        // Get pending orders from IndexedDB
        const pendingOrders = await getPendingOrders();

        if (pendingOrders.length === 0) {
            console.log('Service Worker: No pending orders to sync');
            return;
        }

        console.log(`Service Worker: Syncing ${pendingOrders.length} orders`);

        // Send orders to server
        for (const order of pendingOrders) {
            try {
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                });

                if (response.ok) {
                    await removePendingOrder(order.id);
                    console.log('Service Worker: Order synced:', order.id);
                }
            } catch (error) {
                console.error('Service Worker: Order sync failed:', order.id, error);
            }
        }
    } catch (error) {
        console.error('Service Worker: Sync orders failed:', error);
    }
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push received');

    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Silya\'s Parfumerie';
    const options = {
        body: data.body || 'Nouvelle notification',
        icon: '/assets/images/logo/logo.png',
        badge: '/assets/images/logo/badge.png',
        vibrate: [200, 100, 200],
        data: data.url || '/',
        actions: [
            {
                action: 'view',
                title: 'Voir'
            },
            {
                action: 'close',
                title: 'Fermer'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');

    event.notification.close();

    if (event.action === 'view' || !event.action) {
        const url = event.notification.data || '/';

        event.waitUntil(
            clients.openWindow(url)
        );
    }
});

// Message handler
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => caches.delete(cache))
                );
            })
        );
    }
});

// Helper: Get pending orders from IndexedDB
async function getPendingOrders() {
    // Implementation depends on IndexedDB structure
    // This is a placeholder
    return [];
}

// Helper: Remove pending order from IndexedDB
async function removePendingOrder(orderId) {
    // Implementation depends on IndexedDB structure
    // This is a placeholder
    console.log('Removing order:', orderId);
}

console.log('Service Worker: Loaded successfully');
