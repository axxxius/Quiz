import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams/components'
import { TeamJoin } from '@screens/Teams/types'
import { useMutation } from '@tanstack/react-query'

import { joinTeam } from '../requests/teams/patch{id}'

export const useJoinTeamMutation = (id: number) => {
  return useMutation<
    AxiosResponse<TeamJoin, any>,
    AxiosError<AxiosErrorData, any>,
    number,
    unknown
  >({
    mutationKey: ['sendTeam', id],
    mutationFn: (id: number) => joinTeam(id)
  })
}
