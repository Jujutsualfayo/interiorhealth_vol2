import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const api = axios.create({
  baseURL: base ? base.replace(/\/$/, '') : 'http://localhost:8000',
});

export default api;
