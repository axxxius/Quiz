import { api } from './../../../../../../../utils/api/instance'

export const deleteTeamById = async (id: number) => {
  return await api.delete(`/teams/${id}/`)
}
