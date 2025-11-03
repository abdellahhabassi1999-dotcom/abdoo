/* ====================================
   Silya's Parfumerie - Admin Login
   ==================================== */

// Default admin credentials (In production, this should be handled server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'silya2024' // Change this in production!
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (isLoggedIn()) {
        window.location.href = 'admin-panel.html';
    }

    initializeLoginForm();
});

// Initialize login form
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            const icon = togglePassword.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }

    // Focus on username input
    if (usernameInput) {
        usernameInput.focus();
    }

    // Enter key on password field
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin(e);
            }
        });
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate inputs
    if (!username || !password) {
        showAlert('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Show loading
    showLoading(true);

    // Simulate API call delay
    await delay(1000);

    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Success
        const sessionData = {
            username: username,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };

        // Save session
        if (rememberMe) {
            localStorage.setItem('silya-admin-session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('silya-admin-session', JSON.stringify(sessionData));
        }

        // Show success message
        showAlert('Connexion réussie! Redirection...', 'success');

        // Redirect to admin panel
        setTimeout(() => {
            window.location.href = 'admin-panel.html';
        }, 1000);
    } else {
        // Failed
        showLoading(false);
        showAlert('Nom d\'utilisateur ou mot de passe incorrect', 'error');

        // Shake animation
        const loginForm = document.getElementById('loginForm');
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
}

// Check if user is logged in
function isLoggedIn() {
    const localSession = localStorage.getItem('silya-admin-session');
    const sessionSession = sessionStorage.getItem('silya-admin-session');

    if (localSession || sessionSession) {
        try {
            const session = JSON.parse(localSession || sessionSession);

            // Check if session is valid (less than 7 days old for remember me)
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const daysDiff = (now - loginTime) / (1000 * 60 * 60 * 24);

            if (session.rememberMe && daysDiff > 7) {
                // Session expired
                logout();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Invalid session data', error);
            return false;
        }
    }

    return false;
}

// Logout
function logout() {
    localStorage.removeItem('silya-admin-session');
    sessionStorage.removeItem('silya-admin-session');
}

// Show alert message
function showAlert(message, type = 'error') {
    const alertElement = document.getElementById('alertMessage');
    if (!alertElement) return;

    alertElement.textContent = message;
    alertElement.className = `alert alert-${type} show`;

    // Auto-hide after 5 seconds for error, 2 seconds for success
    const hideDelay = type === 'success' ? 2000 : 5000;
    setTimeout(() => {
        alertElement.classList.remove('show');
    }, hideDelay);
}

// Show/hide loading spinner
function showLoading(show) {
    const loading = document.getElementById('loading');
    const submitBtn = document.querySelector('.btn-login');

    if (show) {
        loading.classList.add('show');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
    } else {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

// Utility: Delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Handle "Remember password" browser feature
window.addEventListener('load', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Check if browser autofilled the form
    setTimeout(() => {
        if (usernameInput && passwordInput) {
            if (usernameInput.value || passwordInput.value) {
                // Browser autofilled, enable submit button
                const submitBtn = document.querySelector('.btn-login');
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            }
        }
    }, 100);
});

// Security: Prevent multiple login attempts (simple rate limiting)
let loginAttempts = 0;
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

const originalHandleLogin = handleLogin;
handleLogin = function(e) {
    const now = Date.now();
    const lockoutEnd = localStorage.getItem('silya-admin-lockout');

    if (lockoutEnd && now < parseInt(lockoutEnd)) {
        const remainingMinutes = Math.ceil((parseInt(lockoutEnd) - now) / 60000);
        showAlert(`Trop de tentatives. Réessayez dans ${remainingMinutes} minute(s).`, 'error');
        return;
    }

    // Check attempts
    if (loginAttempts >= MAX_ATTEMPTS) {
        const lockoutEnd = now + LOCKOUT_TIME;
        localStorage.setItem('silya-admin-lockout', lockoutEnd.toString());
        showAlert('Trop de tentatives de connexion. Compte bloqué pour 5 minutes.', 'error');
        return;
    }

    originalHandleLogin.call(this, e).then(() => {
        // Reset attempts on successful login
        loginAttempts = 0;
        localStorage.removeItem('silya-admin-lockout');
    }).catch(() => {
        // Increment attempts on failure
        loginAttempts++;
    });
};

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isLoggedIn,
        logout,
        ADMIN_CREDENTIALS // Remove in production!
    };
}
