import { api } from '@services/http'

export const deleteTeamById = async (id: number) => {
  return await api.delete(`/teams/${id}/`)
}
