import { api } from '@utils'

export const leaveTeamById = async (id: number) => {
  return await api.delete(`/teams/${id}/leave`)
}
