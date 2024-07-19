import { atom } from 'recoil'

export interface ShowModal {
  showTeam: boolean
  showCreatingTeam: boolean
}

const initialState: ShowModal = {
  showTeam: false,
  showCreatingTeam: false
}

export const modalAtom = atom<ShowModal>({
  key: 'modalAtom',
  default: initialState
})
