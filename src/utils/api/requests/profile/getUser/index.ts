import { UserType } from '@screens/Teams/types'
import { api } from '@utils'

export const getUser = async () => {
  return await api.get<UserType>(`/user/`)
}
