import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams'
import { TeamsTable } from '@screens/Teams/components/Table/Table.atom'
import { useQuery } from '@tanstack/react-query'
import { getTeams } from '@utils'

export const useGetTeamsQuery = (
  { params }: AxiosRequestConfig<any>,
  selectedValue: string,
  team_name: string,
  search: string
) => {
  return useQuery<
    AxiosResponse<TeamsTable, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<TeamsTable, any>,
    string[]
  >({
    queryKey: ['getTeams', selectedValue, team_name, search],
    queryFn: () => getTeams({ params })
  })
}
