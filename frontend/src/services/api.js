import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://127.0.0.1:8000/api/auth';
const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || 'http://127.0.0.1:8000';

const accessKey = 'portfolio_access';
const refreshKey = 'portfolio_refresh';

export const mediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_ORIGIN}${path}`;
};

export const tokenStore = {
  getAccess: () => localStorage.getItem(accessKey),
  getRefresh: () => localStorage.getItem(refreshKey),
  setTokens: ({ access, refresh }) => {
    if (access) localStorage.setItem(accessKey, access);
    if (refresh) localStorage.setItem(refreshKey, refresh);
  },
  clear: () => {
    localStorage.removeItem(accessKey);
    localStorage.removeItem(refreshKey);
  },
};

export const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
});

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
});

publicApiClient.interceptors.request.use((config) => {
  if ((config.method || 'get').toLowerCase() === 'get') {
    config.params = { ...(config.params || {}), _ts: Date.now() };
  }
  return config;
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue = [];

const flushQueue = (error, token = null) => {
  queue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  queue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refresh = tokenStore.getRefresh();
    if (!refresh) {
      tokenStore.clear();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((refreshError) => Promise.reject(refreshError));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await authClient.post('/refresh/', { refresh });
      const newToken = response.data.access;
      tokenStore.setTokens({ access: newToken, refresh: response.data.refresh || refresh });
      apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      flushQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      flushQueue(refreshError, null);
      tokenStore.clear();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export { API_BASE_URL, AUTH_BASE_URL, BACKEND_ORIGIN };
