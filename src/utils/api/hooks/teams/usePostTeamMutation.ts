import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData, Team, TeamValue } from '@screens/Teams'
import { useMutation } from '@tanstack/react-query'
import { postTeam } from '@utils'

export const usePostTeamMutation = () => {
  return useMutation<AxiosResponse<Team, any>, AxiosError<AxiosErrorData, any>, TeamValue, unknown>(
    {
      mutationKey: ['sendTeam'],
      mutationFn: (teamValue: TeamValue) => postTeam(teamValue)
    }
  )
}
