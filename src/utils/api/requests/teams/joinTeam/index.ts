import { FullTeam } from '@screens/Teams/types'
import { api } from '@utils'

export const joinTeam = async (user_id: number, team_id: number) => {
  return await api.patch<FullTeam>(`/teams/${team_id}/join/`, { user_id })
}
