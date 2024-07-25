import { AxiosRequestConfig } from 'axios'

import { MyTeamsTable } from '@screens/Teams/components/Tables/MyTeamsTable/MyTeamsTable.atom'
import { api } from '@utils'

export const getMyTeams = async ({ params }: AxiosRequestConfig) => {
  return await api.get<MyTeamsTable>(`/teams/myteams/`, { params })
}
