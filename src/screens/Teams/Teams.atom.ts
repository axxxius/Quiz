import { atom } from 'recoil'

export const captainAtom = atom<boolean>({
  key: 'captainAtom',
  default: false
})
