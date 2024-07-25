import { AxiosError, AxiosResponse } from 'axios'

import { AxiosErrorData, UserType } from '@screens/Teams'
import { AllTeamsTable } from '@screens/Teams/components/Tables/AllTeamsTable/AllTeamsTable.atom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@utils'

export const useGetUserQuery = (isCaptain: string, { ...options }) => {
  return useQuery<
    AxiosResponse<UserType, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<UserType, any>,
    (string | boolean | AllTeamsTable)[]
  >({
    queryKey: ['getUser', isCaptain],
    queryFn: () => getUser(),
    ...options
  })
}
