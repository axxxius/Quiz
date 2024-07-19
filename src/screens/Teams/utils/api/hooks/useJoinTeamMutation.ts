import { useMutation } from '@tanstack/react-query'
import { joinTeam } from '../requests/teams/patch{id}'

export const useJoinTeamMutation = (id: number) => {
  return useMutation({
    mutationKey: ['sendTeam', id],
    mutationFn: (id: number) => joinTeam(id)
  })
}
