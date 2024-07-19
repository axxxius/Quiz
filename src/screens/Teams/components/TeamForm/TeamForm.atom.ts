import { atom } from 'recoil'

import { TeamFormValues } from '@screens/Teams/types'

const initialState: TeamFormValues = {
  team_name: '',
  team_desc: ''
}

export const teamFormAtom = atom<TeamFormValues>({
  key: 'teamFormAtom',
  default: initialState
})
