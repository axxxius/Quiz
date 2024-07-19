import { TeamJoin } from '@screens/Teams/types'
import { api } from '@services/http'

export const joinTeam = async (id: number) => {
  return await api.patch<TeamJoin>(`/teams/${id}/`)
}
