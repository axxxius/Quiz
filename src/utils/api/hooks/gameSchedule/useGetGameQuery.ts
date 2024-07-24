import { useQuery } from '@tanstack/react-query'
import { getGame } from '@utils'

export const useGetGameQuery = (id: number, enabled: boolean) => {
  const { data, error, status } = useQuery<Game, Error>({
    queryKey: ['games', id],
    queryFn: async () => {
      try {
        const response = await getGame({ params: { game_id: id } })
        return response.data
      } catch (error) {
        throw new Error('Ошибка при получении данных игры')
      }
    },
    staleTime: 5 * 60 * 1000, // Данные считаются свежими в течение 5 минут
    enabled
  })

  return { data, error, status }
}
