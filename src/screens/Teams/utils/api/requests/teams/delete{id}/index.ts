import { api } from '@utils'

export const deleteTeamById = async (id: number) => {
  return await api.delete(`/teams/${id}/`)
}
