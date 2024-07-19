import { atom } from 'recoil'

import { FullTeam } from '@screens/Teams/types'

const initialState: FullTeam = {
  team_name: '',
  team_desc: '',
  team_members: [],
  team_points: 0,
  team_rating: 0,
  captain_name: ''
}

export const teamAtom = atom<FullTeam>({
  key: 'teamAtom',
  default: initialState
})
