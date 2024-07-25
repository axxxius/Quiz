import { api } from '@utils'

export const getTeamIdInGame = async ({ gameId }: { gameId: number }) =>
  await api.get(`/games/${gameId}/teams`)
