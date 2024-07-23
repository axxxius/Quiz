import { api, RequestConfig } from '@utils'

type Token = Pick<Tokens, 'refresh_token'>

export type LogoutConfig = RequestConfig<Token>

export const logout = async ({ params, config }: LogoutConfig) =>
  await api.post('/auth/logout/', params, config)
