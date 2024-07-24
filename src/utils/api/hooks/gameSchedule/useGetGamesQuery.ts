import { useQuery } from '@tanstack/react-query'
import { fetchGames } from '@utils'

export const useGetGamesQuery = (page: number) => {
  const { data } = useQuery<GameInSchedule[]>({
    queryKey: ['games', page],
    queryFn: async () => {
      const response = await fetchGames({ params: { page: page } })
      return response.data
    }
  })

  return { data }
}
