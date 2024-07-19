import { atom } from 'recoil'

interface Role {
  isCaptain: boolean
  isMember: boolean
  isMemberInTeam: boolean
}

const initialState: Role = {
  isCaptain: false,
  isMember: true,
  isMemberInTeam: false
}

export const roleAtom = atom<Role>({
  key: 'roleAtom',
  default: initialState
})
