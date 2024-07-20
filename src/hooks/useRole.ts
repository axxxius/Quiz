import { useJwt } from 'react-jwt'
import { useRecoilValue } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom.ts'

interface TokenPayload {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  role: string
}

export const useRole = () => {
  const authState = useRecoilValue(authAtom)
  const accessToken = authState.accessToken

  const { decodedToken } = useJwt<TokenPayload>(accessToken)
  const role = decodedToken?.role

  return {
    role
  }
}
