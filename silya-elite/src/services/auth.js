/**
 * ============================================
 * Auth Service - User Authentication
 * Silya's Elite V3
 * ============================================
 */

class AuthService {
    constructor() {
        this.store = window.store;
        this.api = window.api;
    }

    /**
     * Login user
     */
    async login(credentials) {
        try {
            const user = await this.api.login(credentials);

            this.store.dispatch({
                type: ActionTypes.SET_USER,
                payload: user
            });

            this.showNotification('Connexion réussie!', 'success');
            return user;
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    /**
     * Register new user
     */
    async register(userData) {
        try {
            const user = await this.api.register(userData);

            this.store.dispatch({
                type: ActionTypes.SET_USER,
                payload: user
            });

            this.showNotification('Compte créé avec succès!', 'success');
            return user;
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    /**
     * Logout user
     */
    logout() {
        this.store.dispatch({
            type: ActionTypes.LOGOUT
        });

        this.showNotification('Déconnexion réussie', 'info');
    }

    /**
     * Update user profile
     */
    async updateProfile(updates) {
        try {
            this.store.dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: updates
            });

            this.showNotification('Profil mis à jour', 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.store.getState().user;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.store.getState().isAuthenticated;
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        this.store.dispatch({
            type: ActionTypes.SHOW_NOTIFICATION,
            payload: { message, type }
        });

        setTimeout(() => {
            this.store.dispatch({
                type: ActionTypes.HIDE_NOTIFICATION
            });
        }, 3000);
    }
}

// Create singleton instance
const authService = new AuthService();
window.authService = authService;
