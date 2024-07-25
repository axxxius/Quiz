import { atom } from 'recoil'

import { Team } from '@screens/Teams/types'

export interface TeamsTable {
  teams: Team[]
}

const initialState: TeamsTable = {
  teams: []
}

export const teamsTableAtom = atom<TeamsTable>({
  key: 'teamsTableAtom',
  default: initialState
})
