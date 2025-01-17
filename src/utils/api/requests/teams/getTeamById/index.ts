import { FullTeam } from '@screens/Teams/types'
import { api } from '@utils'

export const getTeamById = async (id: number) => {
  return await api.get<FullTeam>(`/teams/${id}/`)
}
