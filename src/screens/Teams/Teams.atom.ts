import { atom } from 'recoil'

interface Role {
  isCaptain: boolean
  role: 'player' | 'leading'
  id: number
}

const initialState: Role = {
  isCaptain: false,
  role: 'player',
  id: 8
}

export const roleAtom = atom<Role>({
  key: 'roleAtom',
  default: initialState
})
