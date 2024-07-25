import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData, FullTeam, TeamUpdateValue } from '@screens/Teams'
import { useMutation } from '@tanstack/react-query'
import { editTeam } from '@utils'

interface ParamEditTeamMutation {
  team_id: number
  teamUpdateValue: TeamUpdateValue
}

export const useEditTeamMutation = (team_id: number) => {
  return useMutation<
    AxiosResponse<FullTeam, any>,
    AxiosError<AxiosErrorData, any>,
    ParamEditTeamMutation,
    unknown
  >({
    mutationKey: ['editTeam', team_id],
    mutationFn: ({ team_id, teamUpdateValue }: ParamEditTeamMutation) =>
      editTeam(team_id, teamUpdateValue)
  })
}
