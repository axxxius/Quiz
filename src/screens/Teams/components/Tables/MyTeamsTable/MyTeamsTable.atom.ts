import { atom } from 'recoil'

import { Team } from '@screens/Teams/types'

export interface MyTeamsTable {
  user_teams: Team[]
}

const initialState: MyTeamsTable = {
  user_teams: []
}

export const myTeamsTableAtom = atom<MyTeamsTable>({
  key: 'myTeamsTableAtom',
  default: initialState
})
