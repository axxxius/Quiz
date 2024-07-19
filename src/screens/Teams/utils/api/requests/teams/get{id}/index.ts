import { FullTeam } from '@screens/Teams/types'
import { api } from '@services/http'

export const getTeam = async (id: number) => {
  return await api.get<FullTeam>(`/teams/${id}/`)
}
