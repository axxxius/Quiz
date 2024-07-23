import axios from 'axios'

import { LoginFormValues } from '@screens/Auth/components'
import { RequestConfig } from '@utils'

export type LoginConfig = RequestConfig<LoginFormValues>

export const login = async ({ params, config }: LoginConfig) =>
  await axios.post<AuthState>(`${import.meta.env.VITE_API_URL}/auth/login/`, params, config)
