import { useMutation } from '@tanstack/react-query'
import { addQuestion } from '@utils'

export const usePostAddQuestionMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['add-question'],
    mutationFn: async ({
      gameId,
      question
    }: {
      gameId: number
      question: Omit<Question, 'id'>[]
    }) => addQuestion({ gameId, question })
  })

  return { mutate, isPending }
}
