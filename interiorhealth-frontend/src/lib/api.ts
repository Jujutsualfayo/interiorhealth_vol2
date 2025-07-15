import axios from 'axios';

const API = axios.create({
  baseURL: 'https://psychic-journey-x55p7j9qq75vh645x-8000.app.github.dev/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.defaults.withCredentials = true;

// Automatically attach token if present
API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
