/**
 * ═══════════════════════════════════════════════════════════════
 * SILYA ELITE - CORE FRAMEWORK
 * A lightweight, component-based framework (React-like in vanilla JS)
 * ═══════════════════════════════════════════════════════════════
 */

// ==================== Component System ====================

class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
        this.children = [];
        this._mounted = false;
    }

    setState(newState) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };

        if (this._mounted) {
            this.componentWillUpdate?.(this.props, oldState);
            this.update();
            this.componentDidUpdate?.(this.props, oldState);
        }
    }

    render() {
        return '';
    }

    mount(container) {
        this.componentWillMount?.();
        const html = this.render();

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (container) {
            container.innerHTML = html;
            this.element = container.firstElementChild || container;
            this._mounted = true;
            this.componentDidMount?.();
            this.attachEventListeners?.();
        }

        return this;
    }

    update() {
        if (this.element && this.element.parentNode) {
            const html = this.render();
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const newElement = temp.firstElementChild;

            if (newElement) {
                this.element.parentNode.replaceChild(newElement, this.element);
                this.element = newElement;
                this.attachEventListeners?.();
            }
        }
    }

    unmount() {
        this.componentWillUnmount?.();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this._mounted = false;
    }

    // Lifecycle hooks (to be overridden)
    componentWillMount() {}
    componentDidMount() {}
    componentWillUpdate(nextProps, nextState) {}
    componentDidUpdate(prevProps, prevState) {}
    componentWillUnmount() {}
    attachEventListeners() {}
}

// ==================== State Management (Redux-like) ====================

class Store {
    constructor(reducer, initialState = {}) {
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return { ...this.state };
    }

    dispatch(action) {
        console.log('📤 Action:', action.type, action.payload);
        const oldState = this.state;
        this.state = this.reducer(this.state, action);

        if (oldState !== this.state) {
            this.listeners.forEach(listener => listener(this.state, action));
        }

        return action;
    }

    subscribe(listener) {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

// ==================== Event Bus ====================

class EventBus {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);

        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    once(event, callback) {
        const onceCallback = (data) => {
            callback(data);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }
}

// ==================== Router ====================

class Router {
    constructor(routes = []) {
        this.routes = routes;
        this.currentRoute = null;
        this.params = {};
        this.query = {};

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, queryString] = hash.split('?');

        // Parse query parameters
        this.query = {};
        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                this.query[key] = decodeURIComponent(value);
            });
        }

        // Find matching route
        const route = this.routes.find(r => {
            const pattern = this.routeToRegex(r.path);
            return pattern.test(path);
        });

        if (route) {
            this.params = this.extractParams(route.path, path);
            this.currentRoute = route;
            route.component({ params: this.params, query: this.query });
        } else {
            console.error('404: Route not found -', path);
            this.navigate('/404');
        }
    }

    routeToRegex(route) {
        const pattern = route
            .replace(/\//g, '\\/')
            .replace(/:([^\/]+)/g, '([^\\/]+)');
        return new RegExp(`^${pattern}$`);
    }

    extractParams(route, path) {
        const params = {};
        const routeParts = route.split('/');
        const pathParts = path.split('/');

        routeParts.forEach((part, i) => {
            if (part.startsWith(':')) {
                const paramName = part.slice(1);
                params[paramName] = pathParts[i];
            }
        });

        return params;
    }

    navigate(path, query = {}) {
        let url = `#${path}`;
        const queryString = Object.entries(query)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        if (queryString) {
            url += `?${queryString}`;
        }

        window.location.hash = url;
    }

    back() {
        window.history.back();
    }

    forward() {
        window.history.forward();
    }
}

// ==================== HTTP Client ====================

class HTTP {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.interceptors = {
            request: [],
            response: []
        };
    }

    async request(url, options = {}) {
        let config = {
            url: this.baseURL + url,
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        // Apply request interceptors
        for (const interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }

        try {
            const response = await fetch(config.url, config);
            let data = await response.json().catch(() => response.text());

            const result = {
                data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config
            };

            // Apply response interceptors
            for (const interceptor of this.interceptors.response) {
                data = await interceptor(result);
            }

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }

            return result;
        } catch (error) {
            console.error('HTTP Request failed:', error);
            throw error;
        }
    }

    get(url, config = {}) {
        return this.request(url, { ...config, method: 'GET' });
    }

    post(url, data, config = {}) {
        return this.request(url, {
            ...config,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    put(url, data, config = {}) {
        return this.request(url, {
            ...config,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    delete(url, config = {}) {
        return this.request(url, { ...config, method: 'DELETE' });
    }

    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }

    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }
}

// ==================== Reactive Data Binding ====================

class Observable {
    constructor(data) {
        this.listeners = [];
        this.data = this.makeReactive(data);
    }

    makeReactive(obj) {
        const self = this;

        return new Proxy(obj, {
            set(target, property, value) {
                const oldValue = target[property];
                target[property] = value;

                if (oldValue !== value) {
                    self.notify({ property, value, oldValue });
                }

                return true;
            },
            get(target, property) {
                const value = target[property];

                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    return self.makeReactive(value);
                }

                return value;
            }
        });
    }

    subscribe(listener) {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify(change) {
        this.listeners.forEach(listener => listener(this.data, change));
    }
}

// ==================== Template Engine ====================

const html = (strings, ...values) => {
    return strings.reduce((result, string, i) => {
        const value = values[i] !== undefined ? values[i] : '';
        return result + string + value;
    }, '');
};

const css = html;

// ==================== Utilities ====================

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const createElement = (tag, attrs = {}, children = []) => {
    const element = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on')) {
            const event = key.slice(2).toLowerCase();
            element.addEventListener(event, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    });

    return element;
};

// ==================== Export ====================

window.SilyaCore = {
    Component,
    Store,
    EventBus,
    Router,
    HTTP,
    Observable,
    html,
    css,
    $,
    $$,
    createElement,

    // Create global instances
    eventBus: new EventBus(),
    http: new HTTP('/api')
};

console.log('🚀 Silya Elite Core Framework loaded successfully!');
console.log('📦 Available:', Object.keys(window.SilyaCore).join(', '));
