import { atom } from 'recoil'

import { UserType } from '@screens/Teams'

const initialState: UserType = {
  user_id: 0,
  user_name: '',
  user_email: '',
  user_role: '',
  user_gender: 'female',
  is_captain: false,
  user_teams: []
}

export const userAtom = atom<UserType>({
  key: 'userAtom',
  default: initialState
})
