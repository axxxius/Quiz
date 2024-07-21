import { TeamJoin } from '@screens/Teams/types'
import { api } from '@utils'

export const joinTeam = async (id: number) => {
  return await api.patch<TeamJoin>(`/teams/${id}/`)
}
