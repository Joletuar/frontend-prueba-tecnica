import axios from 'axios'

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
