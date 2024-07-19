import { Team, TeamValue } from '@screens/Teams/types'
import { api } from '@services/http'

export const postTeam = async (teamValue: TeamValue) => {
  return await api.post<Team>('/teams/', teamValue)
}
