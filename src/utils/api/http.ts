import axios from 'axios'
import { useSetRecoilState } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom.ts'

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
        const { access_token, refresh_token } = response.data.tokens
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        const setAuthState = useSetRecoilState(authAtom)
        setAuthState((prev) => ({
          ...prev,
          tokens: {
            access_token,
            refresh_token
          }
        }))

        return api.request(originalRequest)
      } catch (e) {
        const setAuthState = useSetRecoilState(authAtom)
        setAuthState({
          tokens: {
            access_token: '',
            refresh_token: ''
          },
          user: {
            id: 0,
            username: '',
            email: '',
            gender: '',
            description: ''
          }
        })
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }
    }
    throw error
  }
)
