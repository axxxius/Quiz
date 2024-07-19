import { Team } from '@screens/Teams/types'
import { api } from '@services/http'

export const getTeams = async () => {
  return await api.get<Team[]>('/teams/')
}
