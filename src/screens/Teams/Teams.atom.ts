import { atom } from 'recoil'

type CapitanValue = 'default' | 'capitan' | 'player'

export const captainAtom = atom<CapitanValue>({
  key: 'captainAtom',
  default: 'default'
})
