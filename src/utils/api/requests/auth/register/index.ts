import axios from 'axios'

import { RegisterFormValues } from '@screens/Auth/components'
import { RequestConfig } from '@utils'

export type RegisterConfig = RequestConfig<RegisterFormValues>

export const register = async ({ params, config }: RegisterConfig) =>
  await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/`, params, config)
