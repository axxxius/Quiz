import { AxiosRequestConfig } from 'axios'

import { TeamsTable } from '@screens/Teams/components/Table/Table.atom'
import { api } from '@utils'

export const getTeams = async ({ params }: AxiosRequestConfig<{ ordering: string }>) => {
  return await api.get<TeamsTable>(`/teams/`, { params })
}
