import axios from 'axios';
import {CookieExtractor} from "./Utils/CookieExtractor.tsx";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Cookie handling
});

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

api.defaults.withXSRFToken = true

export default api;
