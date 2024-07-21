import { LoginFormValues } from '@screens/Auth/components'
import { api, RequestConfig } from '@utils'

export type LoginConfig = RequestConfig<LoginFormValues>

export const login = async ({ params, config }: LoginConfig) =>
  await api.post<AuthState>('/auth/login/', params, config)
