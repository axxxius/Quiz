import { AxiosRequestConfig } from 'axios'

import { Team } from '@screens/Teams/types'
import { api } from '@utils'

export const getTeams = async ({ params }: AxiosRequestConfig<{ ordering: string }>) => {
  console.log(params, 'params')
  return await api.get<{ teams: Team[] }>('/teams/', { params })
}
