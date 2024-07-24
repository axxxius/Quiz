import { api } from '@utils'

export const postAnswer = async ({
  gameId,
  teamAnswer
}: {
  gameId: number
  teamAnswer: Omit<TeamAnswer, 'id'>
}) => await api.post(`/games/${gameId}/play/`, { data: teamAnswer })
