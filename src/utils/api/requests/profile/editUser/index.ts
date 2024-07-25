import { UserType } from '@screens/Teams/types'
import { api } from '@utils'

export interface UserUpdate {
  user_name: string
  user_gender: string
}

export const editUser = async (userUpdate: UserUpdate) => {
  return await api.patch<UserType>(`/user/`, userUpdate)
}
