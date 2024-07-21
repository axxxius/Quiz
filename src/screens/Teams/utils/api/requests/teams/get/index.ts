import { Team } from '@screens/Teams/types'
import { api } from '@utils'

export const getTeams = async () => {
  return await api.get<{ teams: Team[] }>('/teams/')
}
