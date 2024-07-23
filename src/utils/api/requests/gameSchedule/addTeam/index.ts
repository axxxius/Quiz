import { api } from '@utils'

export const addTeam = async ({
  gameId,
  userId
}: {
  gameId: number
  userId: { user_id: number }
}) => await api.post(`/games/${gameId}/teams/`, { data: userId })
