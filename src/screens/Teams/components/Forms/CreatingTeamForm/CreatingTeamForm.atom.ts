import { atom } from 'recoil'

import { CreatingTeamFormValues } from '@screens/Teams'

const initialState: CreatingTeamFormValues = {
  team_name: '',
  team_desc: ''
}

export const creatingTeamFormAtom = atom<CreatingTeamFormValues>({
  key: 'teamFormAtom',
  default: initialState
})
