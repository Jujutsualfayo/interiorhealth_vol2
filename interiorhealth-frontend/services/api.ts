
import axios from "axios";
import Cookies from "js-cookie";

const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const api = axios.create({
  baseURL: base ? base.replace(/\/$/, '') : 'http://localhost:8000',
});

// Add interceptor to attach JWT token from cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
