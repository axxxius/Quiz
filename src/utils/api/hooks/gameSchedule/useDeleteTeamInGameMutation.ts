import { useMutation } from '@tanstack/react-query'
import { deleteTeam } from '@utils'

export const useDeleteTeamInGameMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ['add-team'],
    mutationFn: async ({ game_id, team_id }: { game_id: number; team_id: number }) =>
      deleteTeam({ gameId: game_id, userId: { team_id: team_id } })
  })

  return { deleteTeam: mutate }
}
