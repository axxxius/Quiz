import axios from 'axios'

import { RequestConfig } from '@utils'

interface RefreshParams {
  token: string
}

export type RefreshConfig = RequestConfig<RefreshParams>

export const refresh = async ({ params, config }: RefreshConfig) =>
  await axios.get<AuthState>(
    `${import.meta.env.VITE_API_URL}/auth/refresh/?token=${params.token}`,
    config
  )
