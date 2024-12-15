import axios from 'axios';
import {CookieExtractor} from "./Utils/CookieExtractor.tsx";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Cookie handling
});

let showError: ((message: string) => void) | null = null;

export const setApiErrorHandler = (handler: (message: string) => void) => {
  showError = handler;
};

// Interceptor which adds token to request headers
api.interceptors.request.use((config) => {
  const csrfToken = CookieExtractor('csrf-token'); // Get csrf token from cookies
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  const token = localStorage.getItem('token'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handler interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (showError) {
      if (error.response) {
        showError(error.response.data?.message || 'An error occurred');
      } else {
        showError('Network error or server is not reachable');
      }
    }
    return Promise.reject(new Error(error));
  }
);

api.defaults.withXSRFToken = true

export default api;
