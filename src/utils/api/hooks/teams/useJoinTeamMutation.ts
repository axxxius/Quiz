import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData, FullTeam } from '@screens/Teams'
import { useMutation } from '@tanstack/react-query'
import { joinTeam } from '@utils'

interface ParamJoinMutation {
  user_id: number
  team_id: number
}

export const useJoinTeamMutation = (team_id: number) => {
  return useMutation<
    AxiosResponse<FullTeam, any>,
    AxiosError<AxiosErrorData, any>,
    ParamJoinMutation,
    unknown
  >({
    mutationKey: ['sendTeam', team_id],
    mutationFn: ({ user_id, team_id }: ParamJoinMutation) => joinTeam(user_id, team_id)
  })
}
