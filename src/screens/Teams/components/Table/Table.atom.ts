import { atom } from 'recoil'

import { Team } from '@screens/Teams/types'

export interface TeamsTable {
  user_teams: Team[],
  teams: Team[]
}

const initialState: TeamsTable = {
  user_teams: [],
  teams: []
}

export const teamsTableAtom = atom<TeamsTable>({
  key: 'teamsTableAtom',
  default: initialState
})
