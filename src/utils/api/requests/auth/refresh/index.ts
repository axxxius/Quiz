import axios from 'axios'

export const refresh = async () =>
  await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
    withCredentials: true
  })
