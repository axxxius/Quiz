import { api } from '@utils'

export const deleteTeam = async ({
  gameId,
  userId
}: {
  gameId: number
  userId: { team_id: number }
}) => await api.delete(`/games/${gameId}/teams/`, { data: userId })
