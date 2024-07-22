import { PropsWithChildren, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom.ts'
import { useGetRefreshQuery } from '@utils'

const AuthProvider = (props: PropsWithChildren) => {
  const { data, isSuccess } = useGetRefreshQuery({
    config: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  })

  const setAuthState = useSetRecoilState(authAtom)

  useEffect(() => {
    if (isSuccess) {
      setAuthState((prev) => ({
        ...prev,
        access_token: data.data.access_token,
        user: data.data.user
      }))
      localStorage.setItem('access_token', data.data.access_token ?? '')
    }
  }, [isSuccess])

  return <>{props.children}</>
}

export default AuthProvider
