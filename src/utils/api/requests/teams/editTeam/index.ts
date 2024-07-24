import { FullTeam, TeamUpdateValue } from '@screens/Teams/types'
import { api } from '@utils'

export const editTeam = async (team_id: number, teamUpdateValue: TeamUpdateValue) => {
  return await api.patch<FullTeam>(`/teams/${team_id}/`, teamUpdateValue)
}
