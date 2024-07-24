import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams'
import { useMutation } from '@tanstack/react-query'
import { deleteTeamById } from '@utils'

export const useDeleteTeamMutation = (id: number) => {
  return useMutation<AxiosResponse<any, any>, AxiosError<AxiosErrorData, any>, number, unknown>({
    mutationKey: ['deleteTeam', id],
    mutationFn: (id: number) => deleteTeamById(id)
  })
}
