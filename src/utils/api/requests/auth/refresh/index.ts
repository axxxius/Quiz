import axios from 'axios'

export const refresh = async () =>
  await axios.get<AuthState>(`${import.meta.env.VITE_API_URL}/auth/refresh/`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
  })
