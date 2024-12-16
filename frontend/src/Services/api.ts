import axios from 'axios';

const api = axios.create({
  withCredentials: true, // Cookie handling
});

let showError: ((message: string) => void) | null = null;

export const setApiErrorHandler = (handler: (message: string) => void) => {
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
      showError('Failed to fetch CSRF token');
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
        showError(error.response.data?.message || 'An error occurred');
      } else {
        showError('Network error or server is not reachable');
      }
    }
    return Promise.reject(new Error(error));
  }
);

api.defaults.withXSRFToken = false;

export default api;
