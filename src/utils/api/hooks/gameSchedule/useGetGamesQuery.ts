import { useQuery } from '@tanstack/react-query'
import { fetchGames } from '@utils'

export const useGetGamesQuery = ({ page }: { page: number }) => {
  const { data } = useQuery<GameInSchedule[], unknown>({
    queryKey: ['games', page],
    queryFn: async () => {
      const response = await fetchGames({ page })
      return response.data
    }
  })

  return { data }
}
