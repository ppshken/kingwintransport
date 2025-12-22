import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - Add JWT token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error
            if (error.response.status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('admin_token');
                localStorage.removeItem('admin_user');
                if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
                    window.location.href = '/admin/login';
                }
            }

            // Return error message from server
            const message = error.response.data?.message || 'เกิดข้อผิดพลาด';
            return Promise.reject(new Error(message));
        } else if (error.request) {
            // Request made but no response
            return Promise.reject(new Error('ไม่สามารถเชื่อมต่อกับ server ได้'));
        } else {
            // Something else happened
            return Promise.reject(error);
        }
    }
);

export default api;
