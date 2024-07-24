import { atom } from 'recoil'

import { FullTeam } from '@screens/Teams/types'

const initialState: FullTeam = {
  team_name: '',
  team_desc: '',
  team_creation_date: '',
  team_played_games: 0,
  team_points: 0,
  team_place: 0,
  team_captain_name: '',
  team_members: []
}

export const teamAtom = atom<FullTeam>({
  key: 'teamAtom',
  default: initialState
})
