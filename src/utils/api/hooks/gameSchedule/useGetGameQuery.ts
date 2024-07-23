import { useQuery } from '@tanstack/react-query'
import { getGame } from '@utils'

export const useGetGameQuery = (id: number) => {
  const { data } = useQuery<Game, unknown>({
    queryKey: ['games', id],
    queryFn: async () => {
      const response = await getGame({ params: { game_id: id } })
      return response.data
    }
  })

  return { data }
}
