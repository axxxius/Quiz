import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams'
import { TeamsTable } from '@screens/Teams/components/Table/Table.atom'
import { useQuery } from '@tanstack/react-query'
import { getTeams } from '@utils'

export const useGetTeamsQuery = (
  { params }: AxiosRequestConfig<any>,
  selectedValue: string,
  team_name: string,
  search: string,
  teamsTable: TeamsTable,
  user_id: number
) => {
  return useQuery<
    AxiosResponse<TeamsTable, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<TeamsTable, any>,
    (string | TeamsTable | number)[]
  >({
    queryKey: ['getTeams', selectedValue, team_name, search, teamsTable, user_id],
    queryFn: () => getTeams({ params })
  })
}
