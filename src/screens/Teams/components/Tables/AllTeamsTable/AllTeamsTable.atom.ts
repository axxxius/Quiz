import { atom } from 'recoil'

import { Team } from '@screens/Teams/types'

export interface AllTeamsTable {
  teams: Team[]
}

const initialState: AllTeamsTable = {
  teams: []
}

export const allTeamsTableAtom = atom<AllTeamsTable>({
  key: 'allTeamsTableAtom',
  default: initialState
})
