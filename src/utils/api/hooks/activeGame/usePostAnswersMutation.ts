import { useMutation } from '@tanstack/react-query'
import { postAnswer } from '@utils'

export const usePostAnswersMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['add-answer'],
    mutationFn: async ({ gameId, answer }: { gameId: number; answer: Omit<TeamAnswer, 'id'> }) =>
      postAnswer({ gameId: gameId, teamAnswer: answer })
  })

  return { addAnswer: mutate, isPending }
}
