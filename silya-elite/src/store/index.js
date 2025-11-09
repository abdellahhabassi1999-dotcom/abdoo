/**
 * ============================================
 * Global Store - Redux-Style State Management
 * Silya's Elite V3
 * ============================================
 */

// Action Types
const ActionTypes = {
    // Products
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_CATEGORIES: 'SET_CATEGORIES',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    FILTER_PRODUCTS: 'FILTER_PRODUCTS',
    SORT_PRODUCTS: 'SORT_PRODUCTS',

    // Cart
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    APPLY_COUPON: 'APPLY_COUPON',

    // Wishlist
    ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
    REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',

    // User
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    UPDATE_PROFILE: 'UPDATE_PROFILE',

    // Orders
    ADD_ORDER: 'ADD_ORDER',
    SET_ORDERS: 'SET_ORDERS',
    UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',

    // UI
    TOGGLE_CART: 'TOGGLE_CART',
    TOGGLE_SEARCH: 'TOGGLE_SEARCH',
    TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
    SET_THEME: 'SET_THEME',
    SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
    HIDE_NOTIFICATION: 'HIDE_NOTIFICATION'
};

// Initial State
const initialState = {
    // Products
    products: [],
    categories: [],
    filteredProducts: [],
    selectedCategory: 'all',
    sortBy: 'featured',
    searchQuery: '',
    loading: false,
    error: null,

    // Cart
    cart: {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discount: 0,
        coupon: null
    },

    // Wishlist
    wishlist: [],

    // User
    user: null,
    isAuthenticated: false,

    // Orders
    orders: [],

    // UI State
    ui: {
        cartOpen: false,
        searchOpen: false,
        mobileMenuOpen: false,
        theme: 'light',
        notification: {
            show: false,
            message: '',
            type: 'info'
        }
    }
};

// Load persisted state from localStorage
function loadPersistedState() {
    try {
        const cart = JSON.parse(localStorage.getItem('silya_cart') || '{"items":[]}');
        const wishlist = JSON.parse(localStorage.getItem('silya_wishlist') || '[]');
        const user = JSON.parse(localStorage.getItem('silya_user') || 'null');
        const theme = localStorage.getItem('silya_theme') || 'light';

        return {
            ...initialState,
            cart: { ...initialState.cart, ...cart },
            wishlist,
            user,
            isAuthenticated: !!user,
            ui: { ...initialState.ui, theme }
        };
    } catch (error) {
        console.error('Error loading persisted state:', error);
        return initialState;
    }
}

// Reducer Function
function rootReducer(state = loadPersistedState(), action) {
    switch (action.type) {
        // Products
        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload
            };

        case ActionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };

        case ActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case ActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ActionTypes.FILTER_PRODUCTS: {
            const { category, search } = action.payload;
            let filtered = state.products;

            if (category && category !== 'all') {
                filtered = filtered.filter(p => p.category === category);
            }

            if (search) {
                const query = search.toLowerCase();
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.brand?.toLowerCase().includes(query)
                );
            }

            return {
                ...state,
                filteredProducts: filtered,
                selectedCategory: category || state.selectedCategory,
                searchQuery: search !== undefined ? search : state.searchQuery
            };
        }

        case ActionTypes.SORT_PRODUCTS: {
            const sortBy = action.payload;
            let sorted = [...state.filteredProducts];

            switch (sortBy) {
                case 'price_asc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price_desc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'name_asc':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name_desc':
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'newest':
                    sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                    break;
                default:
                    // featured - keep original order
                    break;
            }

            return {
                ...state,
                filteredProducts: sorted,
                sortBy
            };
        }

        // Cart
        case ActionTypes.ADD_TO_CART: {
            const product = action.payload;
            const existingItem = state.cart.items.find(item => item.id === product.id);

            let newItems;
            if (existingItem) {
                newItems = state.cart.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            } else {
                newItems = [...state.cart.items, { ...product, quantity: product.quantity || 1 }];
            }

            const newCart = calculateCartTotals({ ...state.cart, items: newItems });
            persistCart(newCart);

            return {
                ...state,
                cart: newCart
            };
        }

        case ActionTypes.REMOVE_FROM_CART: {
            const newItems = state.cart.items.filter(item => item.id !== action.payload);
            const newCart = calculateCartTotals({ ...state.cart, items: newItems });
            persistCart(newCart);

            return {
                ...state,
                cart: newCart
            };
        }

        case ActionTypes.UPDATE_CART_QUANTITY: {
            const { id, quantity } = action.payload;
            const newItems = state.cart.items.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            );
            const newCart = calculateCartTotals({ ...state.cart, items: newItems });
            persistCart(newCart);

            return {
                ...state,
                cart: newCart
            };
        }

        case ActionTypes.CLEAR_CART: {
            const newCart = { ...initialState.cart };
            persistCart(newCart);

            return {
                ...state,
                cart: newCart
            };
        }

        case ActionTypes.APPLY_COUPON: {
            const coupon = action.payload;
            const newCart = calculateCartTotals({ ...state.cart, coupon });
            persistCart(newCart);

            return {
                ...state,
                cart: newCart
            };
        }

        // Wishlist
        case ActionTypes.ADD_TO_WISHLIST: {
            const newWishlist = [...state.wishlist, action.payload];
            persistWishlist(newWishlist);

            return {
                ...state,
                wishlist: newWishlist
            };
        }

        case ActionTypes.REMOVE_FROM_WISHLIST: {
            const newWishlist = state.wishlist.filter(item => item.id !== action.payload);
            persistWishlist(newWishlist);

            return {
                ...state,
                wishlist: newWishlist
            };
        }

        // User
        case ActionTypes.SET_USER: {
            const user = action.payload;
            persistUser(user);

            return {
                ...state,
                user,
                isAuthenticated: !!user
            };
        }

        case ActionTypes.LOGOUT: {
            localStorage.removeItem('silya_user');

            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        }

        case ActionTypes.UPDATE_PROFILE: {
            const updatedUser = { ...state.user, ...action.payload };
            persistUser(updatedUser);

            return {
                ...state,
                user: updatedUser
            };
        }

        // Orders
        case ActionTypes.ADD_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            };

        case ActionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            };

        case ActionTypes.UPDATE_ORDER_STATUS: {
            const { orderId, status } = action.payload;
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === orderId ? { ...order, status } : order
                )
            };
        }

        // UI
        case ActionTypes.TOGGLE_CART:
            return {
                ...state,
                ui: { ...state.ui, cartOpen: !state.ui.cartOpen }
            };

        case ActionTypes.TOGGLE_SEARCH:
            return {
                ...state,
                ui: { ...state.ui, searchOpen: !state.ui.searchOpen }
            };

        case ActionTypes.TOGGLE_MOBILE_MENU:
            return {
                ...state,
                ui: { ...state.ui, mobileMenuOpen: !state.ui.mobileMenuOpen }
            };

        case ActionTypes.SET_THEME: {
            const theme = action.payload;
            localStorage.setItem('silya_theme', theme);
            document.documentElement.setAttribute('data-theme', theme);

            return {
                ...state,
                ui: { ...state.ui, theme }
            };
        }

        case ActionTypes.SHOW_NOTIFICATION:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    notification: {
                        show: true,
                        message: action.payload.message,
                        type: action.payload.type || 'info'
                    }
                }
            };

        case ActionTypes.HIDE_NOTIFICATION:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    notification: { ...state.ui.notification, show: false }
                }
            };

        default:
            return state;
    }
}

// Helper Functions
function calculateCartTotals(cart) {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2; // 20% VAT
    const shipping = subtotal > 500 ? 0 : 30; // Free shipping over 500 MAD

    let discount = 0;
    if (cart.coupon) {
        discount = cart.coupon.type === 'percentage'
            ? subtotal * (cart.coupon.value / 100)
            : cart.coupon.value;
    }

    const total = subtotal + tax + shipping - discount;

    return {
        ...cart,
        subtotal,
        tax,
        shipping,
        discount,
        total
    };
}

function persistCart(cart) {
    localStorage.setItem('silya_cart', JSON.stringify(cart));
}

function persistWishlist(wishlist) {
    localStorage.setItem('silya_wishlist', JSON.stringify(wishlist));
}

function persistUser(user) {
    localStorage.setItem('silya_user', JSON.stringify(user));
}

// Create Store Instance
const store = new Store(rootReducer, loadPersistedState());

// Export
window.ActionTypes = ActionTypes;
window.store = store;
