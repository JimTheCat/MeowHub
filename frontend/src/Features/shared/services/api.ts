import axios from 'axios';
import {Alert} from "../types/Alert.tsx";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Cookie handling
  headers: {
    'Content-Type': 'application/json'
  }
});

let showError: ((alert: Alert) => void) | null = null;

export const setApiErrorHandler = (handler: (alert: Alert) => void) => {
  showError = handler;
};

// Cache for CSRF Token
let csrfTokenPromise: Promise<string | null> | null = null;

// Fetch CSRF token from server
const fetchCsrfToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get('/api/csrf-token', {withCredentials: true});
    if (response.data.token && response.data.headerName) {
      // Set up cookie with CSRF token
      localStorage.setItem('X-XSRF-TOKEN', response.data.token);
      return response.data.token;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    if (showError) {
      showError(
        {
          title: 'Failed to fetch CSRF token',
          message: 'Failed to fetch CSRF token from the server',
          level: 'ERROR',
          timestamp: new Date().toISOString(),
        }
      );
    }
    return null;
  }
};

// Interceptor which adds token to request headers
api.interceptors.request.use(async (config) => {
  let csrfToken = localStorage.getItem('X-XSRF-TOKEN');

  if (!csrfToken) {
    if (!csrfTokenPromise) {
      csrfTokenPromise = fetchCsrfToken(); // Start fetching token
    }
    csrfToken = await csrfTokenPromise; // Wait for token
    csrfTokenPromise = null; // Reset promise
  }

  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
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
        showError({
          title: error.response.statusText,
          message: error.response.data.message,
          level: 'ERROR',
          timestamp: new Date().toISOString(),
        });
      } else {
        showError({
          title: 'Network error',
          message: 'Failed to connect to the server',
          level: 'ERROR',
          timestamp: new Date().toISOString(),
        });
      }
    }
    return Promise.reject(new Error(error));
  }
);

api.defaults.withXSRFToken = false;

export default api;
