import { AxiosErrorData, UserType } from '@screens/Teams'
import { useMutation } from '@tanstack/react-query'
import { editUser } from '@utils'
import { AxiosError, AxiosResponse } from 'axios'

export interface ParamEditUserMutation {
  user_name: string
  user_gender: string
}

export const useEditUserMutation = () => {
  return useMutation<
    AxiosResponse<UserType, any>,
    AxiosError<AxiosErrorData, any>,
    ParamEditUserMutation,
    unknown
  >({
    mutationKey: ['sendUser'],
    mutationFn: ({ user_name, user_gender }: ParamEditUserMutation) =>
      editUser({ user_name, user_gender })
  })
}
