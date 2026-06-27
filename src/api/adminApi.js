import axios from 'axios';
import storage from '../utils/storage';
import { AUTH_ENDPOINTS } from '../features/auth/constants/auth.constants';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach bearer token to admin requests
adminApi.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Handle errors and auto token-refresh
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return adminApi(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = storage.getRefreshToken();
      if (!refreshToken) {
        isRefreshing = false;
        handleSessionExpired();
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }

      try {
        // Call the refresh endpoint using a clean axios instance to avoid interceptor loops
        const response = await axios.post(
          `${adminApi.defaults.baseURL}${AUTH_ENDPOINTS.REFRESH}`,
          { refresh: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data?.success || response.data?.access) {
          const newAccess = response.data.data?.access || response.data.access;
          const newRefresh = response.data.data?.refresh || response.data.refresh || refreshToken;
          const remember = storage.getRememberDevice();

          // Save new tokens
          storage.setAccessToken(newAccess, remember);
          storage.setRefreshToken(newRefresh, remember);

          // Resolve pending requests in queue
          processQueue(null, newAccess);

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          isRefreshing = false;
          return adminApi(originalRequest);
        } else {
          throw new Error('Token refresh response invalid');
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        handleSessionExpired();
        return Promise.reject(refreshError);
      }
    }

    // Normalize and map other global errors
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      'An unexpected network error occurred';

    const normalizedError = new Error(errorMessage);
    normalizedError.status = error.response?.status;
    normalizedError.data = error.response?.data;

    return Promise.reject(normalizedError);
  }
);

// Clear session storage and redirect to login
function handleSessionExpired() {
  storage.clearAll();
  
  // Custom event to notify the store or application
  const event = new CustomEvent('nb-admin-auth-expired');
  window.dispatchEvent(event);

  // If we are in the browser, redirect to login page if not already there
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin/login')) {
    window.location.href = '/admin/login?expired=true';
  }
}

export default adminApi;
