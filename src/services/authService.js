import api from './api';

export const authService = {
    // Login
    async login(username, password) {
        const response = await api.post('/auth/login', {
            username,
            password
        });

        if (response.data.success) {
            const { token, user } = response.data.data;
            localStorage.setItem('admin_token', token);
            localStorage.setItem('admin_user', JSON.stringify(user));
            return response.data.data;
        }
        throw new Error(response.data.message || 'Login failed');
    },

    // Logout
    logout() {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    },

    // Get current user info
    async getCurrentUser() {
        const response = await api.get('/auth/me');
        return response.data.data;
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('admin_token');
    },

    // Get stored token
    getToken() {
        return localStorage.getItem('admin_token');
    },

    // Get stored user
    getUser() {
        const userStr = localStorage.getItem('admin_user');
        return userStr ? JSON.parse(userStr) : null;
    }
};
