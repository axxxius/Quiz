import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams/components'
import { Team, TeamValue } from '@screens/Teams/types'
import { useMutation } from '@tanstack/react-query'

import { postTeam } from '../requests/teams/post'

export const usePostTeamMutation = () => {
  return useMutation<AxiosResponse<Team, any>, AxiosError<AxiosErrorData, any>, TeamValue, unknown>(
    {
      mutationKey: ['sendTeam'],
      mutationFn: (teamValue: TeamValue) => postTeam(teamValue)
    }
  )
}
