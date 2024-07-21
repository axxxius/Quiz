import { useMutation } from '@tanstack/react-query'

import { deleteTeamById } from '../requests/teams/delete{id}'

export const useDeleteTeamMutation = (id: number) => {
  return useMutation({
    mutationKey: ['deleteTeam', id],
    mutationFn: (id: number) => deleteTeamById(id)
  })
}
