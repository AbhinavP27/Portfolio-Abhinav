import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN || 'http://127.0.0.1:8000';

export const mediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_ORIGIN}${path}`;
};

export const publicApiClient = axios.create({
  baseURL: API_BASE_URL,
});

publicApiClient.interceptors.request.use((config) => {
  if ((config.method || 'get').toLowerCase() === 'get') {
    config.params = { ...(config.params || {}), _ts: Date.now() };
  }
  return config;
});

export { API_BASE_URL, BACKEND_ORIGIN };
