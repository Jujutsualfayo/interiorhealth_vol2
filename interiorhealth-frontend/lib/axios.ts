// lib/axios.ts
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000', // Change this if needed
  withCredentials: true, // If you're using cookies for auth
})

export default instance
