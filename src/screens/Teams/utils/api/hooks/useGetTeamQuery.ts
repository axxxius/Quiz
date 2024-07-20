import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams/components'
import { FullTeam } from '@screens/Teams/types'
import { useQuery } from '@tanstack/react-query'

import { getTeamById } from '../requests/teams/get{id}'

export const useGetTeamQuery = (id: number) => {
  return useQuery<
    AxiosResponse<FullTeam, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<FullTeam, any>,
    (string | number)[]
  >({
    queryKey: ['getTeam', id],
    queryFn: () => getTeamById(id)
  })
}
