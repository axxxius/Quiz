import { useMutation } from '@tanstack/react-query'
import { PostGame } from '@utils'

export const usePostGameMutation = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['add-game'],
    mutationFn: async (
      newGame: Pick<GameInSchedule, 'game_name' | 'game_date' | 'game_description' | 'game_status'>
    ) => PostGame({ params: newGame })
  })

  return { addGame: mutateAsync, isPending }
}
