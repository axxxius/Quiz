import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams/components'
import { Team } from '@screens/Teams/types'
import { useQuery } from '@tanstack/react-query'

import { getTeams } from '../requests/teams/get'

export const useGetTeamsQuery = () => {
  return useQuery<
    AxiosResponse<
      {
        teams: Team[]
      },
      any
    >,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<
      {
        teams: Team[]
      },
      any
    >,
    string[]
  >({
    queryKey: ['getTeams'],
    queryFn: () => getTeams()
  })
}
