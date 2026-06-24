import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize and handle API errors
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      'An unexpected network error occurred';
    
    // Log error securely
    console.error('[API Error]:', errorMessage, error);

    // Customize global error intercepting (e.g. 401 logout)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect or emit event could go here
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
