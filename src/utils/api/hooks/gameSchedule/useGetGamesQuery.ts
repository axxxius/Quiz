import { useQuery } from '@tanstack/react-query'
import { fetchGames } from '@utils'

export const useGetGamesQuery = () => {
  const { data } = useQuery<GameInSchedule[], unknown>({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await fetchGames()
      return response.data
    }
  })

  return { data }
}
