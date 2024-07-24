import { useQuery } from '@tanstack/react-query'
import { getAnswers } from '@utils'

export const useGetAnswerQuery = (gameId: number) => {
  const { data } = useQuery({
    queryKey: ['get-answer', gameId],
    queryFn: async () => {
      const response = await getAnswers({ gameId })
      return response.data
    }
  })

  return { data }
}
