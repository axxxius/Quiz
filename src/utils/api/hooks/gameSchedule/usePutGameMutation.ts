import { useMutation } from '@tanstack/react-query'
import { EditGame } from '@utils'

export const usePutGameMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ['put-game'],
    mutationFn: async ({ game, gameId }: { game: Omit<GameInSchedule, 'id'>; gameId: number }) => {
      const response = await EditGame(game, gameId)
      return response.data
    }
  })

  return { mutate }
}
