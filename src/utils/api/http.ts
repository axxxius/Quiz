import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<AuthState>(
          `${import.meta.env.VITE_API_URL}/auth/refresh/`,
          {
            withCredentials: true
          }
        )
        localStorage.setItem('access_token', response.data.tokens.access_token)
        return api.request(originalRequest)
      } catch (e) {
        console.log('Не авторизован')
      }
    }
    throw error
  }
)
