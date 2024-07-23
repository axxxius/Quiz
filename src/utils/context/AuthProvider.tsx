import { ReactNode, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom.ts'
import { useGetRefreshQuery } from '@utils'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const refreshToken = localStorage.getItem('refresh_token')
  const { data, isSuccess } = useGetRefreshQuery(refreshToken!)

  const setAuthState = useSetRecoilState(authAtom)

  useEffect(() => {
    if (isSuccess) {
      setAuthState((prev) => ({
        ...prev,
        tokens: data.data.tokens,
        user: data.data.user
      }))
      localStorage.setItem('access_token', data.data.tokens.access_token)
      localStorage.setItem('refresh_token', data.data.tokens.refresh_token)
    }
  }, [isSuccess])

  return <>{children}</>
}

export default AuthProvider
