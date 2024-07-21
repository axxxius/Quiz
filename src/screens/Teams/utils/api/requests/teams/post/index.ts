import { Team, TeamValue } from '@screens/Teams/types'
import { api } from '@utils'

export const postTeam = async (teamValue: TeamValue) => {
  return await api.post<Team>('/teams/', teamValue)
}
