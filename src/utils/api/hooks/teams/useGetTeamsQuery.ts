import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AxiosErrorData, AxiosResponseData } from '@screens/Teams'
import { useQuery } from '@tanstack/react-query'
import { getTeams } from '@utils'

export const useGetTeamsQuery = (
  { params }: AxiosRequestConfig<any>,
  selectedValue: string,
  team_name: string,
  search: string
) => {
  return useQuery<
    AxiosResponse<AxiosResponseData, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<AxiosResponseData, any>,
    string[]
  >({
    queryKey: ['getTeams', selectedValue, team_name, search],
    queryFn: () => getTeams({ params })
  })
}
