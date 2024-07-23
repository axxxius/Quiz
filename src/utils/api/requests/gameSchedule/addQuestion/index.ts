import { api } from '@utils'

export const addQuestion = async ({
  gameId,
  question
}: {
  gameId: number
  question: Omit<Question, 'id'>[]
}) => await api.post<Omit<Question, 'id'>>(`/games/${gameId}/ques/`, question)
