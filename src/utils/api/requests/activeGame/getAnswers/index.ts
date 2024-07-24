import { api } from '@utils'

export const getAnswers = async ({ gameId }: { gameId: number }) =>
  await api.get(`/games/${gameId}/play/`)
