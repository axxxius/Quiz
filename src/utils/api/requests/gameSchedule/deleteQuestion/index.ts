import { api } from '@utils'

export const DeleteQuestion = async ({
  gameId,
  quesId
}: {
  gameId: number
  quesId: { ques_id: number }
}) => await api.delete(`/games/${gameId}/ques/`, { data: quesId })
