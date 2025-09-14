// lib/axios.ts
import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const instance = axios.create({
  baseURL: base ? base.replace(/\/$/, '') : 'http://localhost:8000', // prefer origin only (no trailing /api)
  withCredentials: true, // If you're using cookies for auth
})

export default instance
