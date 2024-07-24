import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData, FullTeam } from '@screens/Teams'
import { useQuery } from '@tanstack/react-query'
import { getTeamById } from '@utils'

export const useGetTeamQuery = (id: number, team: FullTeam) => {
  return useQuery<
    AxiosResponse<FullTeam, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<FullTeam, any>,
    (string | number | FullTeam)[]
  >({
    queryKey: ['getTeam', id, team],
    queryFn: () => getTeamById(id)
  })
}
