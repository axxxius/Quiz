import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { isExpired } from 'react-jwt'

import { refresh } from './requests'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

let interceptorsApplied = false

export const applyInterceptors = (
  authState: AuthState,
  setAuthState: Dispatch<SetStateAction<AuthState>>
) => {
  if (interceptorsApplied) return
  interceptorsApplied = true
  let isRefreshing = false

  const refreshRequest = async () => {
    const response = await refresh()
    return response.data
  }

  const ensureAuthorization = async () => {
    const shouldRefresh = !authState.access_token || isExpired(authState.access_token)
    if (shouldRefresh) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const refreshedState = await refreshRequest()
          setAuthState(refreshedState)
          return refreshedState
        } finally {
          isRefreshing = false
        }
      }
    }
    return authState
  }

  api.interceptors.request.use(async (config) => {
    const updatedAuthState = await ensureAuthorization()
    config.headers.Authorization = `Bearer ${updatedAuthState.access_token}`
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (err) => {
      const shouldLogout = err.response && err.response.status === 401
      if (shouldLogout) {
        setAuthState({
          access_token: '',
          user: {
            id: 0,
            email: '',
            username: '',
            gender: '',
            description: ''
          }
        })
      }
      return Promise.reject(err)
    }
  )
}
