import { useMutation } from '@tanstack/react-query'
import { DeleteQuestion } from '@utils'

export const useDeleteQuestionMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-question'],
    mutationFn: async ({ gameId, quesId }: { gameId: number; quesId: { ques_id: number } }) =>
      DeleteQuestion({ gameId, quesId })
  })

  return { deleteQuestion: mutate, isPending }
}
