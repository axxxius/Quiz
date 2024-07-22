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
        localStorage.setItem('access_token', response.data.access_token)
        return api.request(originalRequest)
      } catch (e) {
        console.log('Не авторизован')
      }
    }
    throw error
  }
)

// let interceptorsApplied = false
// export const applyInterceptors = (
//   authState: MutableRefObject<AuthState>,
//   setAuthState: Dispatch<SetStateAction<AuthState>>
// ) => {
//   if (interceptorsApplied) return
//   interceptorsApplied = true
//   let isRefreshing = false
//
//   let refreshRequest = Promise.resolve({
//     accessToken: authState.current.access_token,
//     user: {
//       id: authState.current.user.id,
//       email: authState.current.user.email,
//       name: authState.current.user.username,
//       gender: authState.current.user.gender,
//       description: authState.current.user.description
//     }
//   })
//
//   const isMyTokenExpired = isExpired(authState.current.access_token ?? '')
//
//   const ensureAuthorization = (): Promise<AuthState> => {
//     const shouldRefresh = authState.current.access_token === '' || isMyTokenExpired
//
//     return shouldRefresh ? refreshToken() : Promise.resolve(authState.current)
//   }
//
//   const refreshToken = async (): Promise<AuthState> => {
//     if (isRefreshing) return refreshRequest
//     isRefreshing = true
//
//     refreshRequest = refresh().finally(() => (isRefreshing = false))
//     return refreshRequest
//   }
//
//   api.interceptors.request.use((config) => {
//     return ensureAuthorization().then(({ accessToken, user }) => {
//       setAuthState((prevAuthState) => ({
//         ...prevAuthState,
//         accessToken: accessToken,
//         user: {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           surname: user.surname
//         }
//       }))
//       config.headers.Authorization = `Bearer ${accessToken}`
//       return config
//     })
//   })
//
//   api.interceptors.response.use(
//     (response) => response,
//     (err) => {
//       const shouldLogout = err.response && err.response.status === 401
//
//       if (shouldLogout) {
//         setAuthState({
//           access_token: '',
//           user: {
//             id: 0,
//             email: '',
//             username: '',
//             gender: '',
//             description: ''
//           }
//         })
//       }
//
//       throw err
//     }
//   )
// }
