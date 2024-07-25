import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData, UserType } from '@screens/Teams'
import { TeamsTable } from '@screens/Teams/components/Table/Table.atom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@utils'

export const useGetUserQuery = (isCaptain: string) => {
  return useQuery<
    AxiosResponse<UserType, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<UserType, any>,
    (string | boolean | TeamsTable)[]
  >({
    queryKey: ['getUser', isCaptain],
    queryFn: () => getUser(),
    gcTime: 5
  })
}
