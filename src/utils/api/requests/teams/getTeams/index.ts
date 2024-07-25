import { AxiosRequestConfig } from 'axios'

import { AllTeamsTable } from '@screens/Teams/components/Tables/AllTeamsTable/AllTeamsTable.atom'
import { api } from '@utils'

export const getTeams = async ({ params }: AxiosRequestConfig) => {
  return await api.get<AllTeamsTable>(`/teams/`, { params })
}
