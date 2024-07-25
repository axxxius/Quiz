import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AxiosErrorData } from '@screens/Teams'
import { AllTeamsTable } from '@screens/Teams/components/Tables/AllTeamsTable/AllTeamsTable.atom'
import { MyTeamsTable } from '@screens/Teams/components/Tables/MyTeamsTable/MyTeamsTable.atom'
import { useQuery } from '@tanstack/react-query'
import { getTeams } from '@utils'

export const useGetTeamsQuery = (
  { params }: AxiosRequestConfig<any>,
  selectedValue: string,
  team_name: string,
  search: string,
  teamsTable: AllTeamsTable,
  user_id: number,
  page: number,
  myTeams: MyTeamsTable
) => {
  return useQuery<
    AxiosResponse<AllTeamsTable, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<AllTeamsTable, any>,
    (string | AllTeamsTable | MyTeamsTable | number)[]
  >({
    queryKey: ['getTeams', selectedValue, team_name, search, teamsTable, user_id, page, myTeams],
    queryFn: () => getTeams({ params })
  })
}
