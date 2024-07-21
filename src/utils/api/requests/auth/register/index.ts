import { RegisterFormValues } from '@screens/Auth/components'
import { api, RequestConfig } from '@utils'

export type RegisterConfig = RequestConfig<RegisterFormValues>

export const register = async ({ params, config }: RegisterConfig) =>
  await api.post('/auth/register/', params, config)
