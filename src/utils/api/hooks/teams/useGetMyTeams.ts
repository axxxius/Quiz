import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { AxiosErrorData, UserMember } from '@screens/Teams'
import { AllTeamsTable } from '@screens/Teams/components/Tables/AllTeamsTable/AllTeamsTable.atom'
import { MyTeamsTable } from '@screens/Teams/components/Tables/MyTeamsTable/MyTeamsTable.atom'
import { useQuery } from '@tanstack/react-query'
import { getMyTeams } from '@utils'

export const useGetMyTeamsQuery = (
  { params }: AxiosRequestConfig<any>,
  selectedValue: string,
  team_name: string,
  team_members: UserMember[],
  search: string,
  teamsTable: MyTeamsTable,
  user_id: number,
  page: number,
  allTeams: AllTeamsTable
) => {
  return useQuery<
    AxiosResponse<MyTeamsTable, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<MyTeamsTable, any>,
    (string | MyTeamsTable | number | AllTeamsTable | UserMember[])[]
  >({
    queryKey: [
      'getTeams',
      selectedValue,
      team_name,
      search,
      teamsTable,
      user_id,
      page,
      team_members,
      allTeams
    ],
    queryFn: () => getMyTeams({ params }),
    gcTime: 1
  })
}
