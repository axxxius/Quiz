import { atom } from 'recoil'

const initialAuthState: AuthState = {
  accessToken: '',
  user: {
    id: '',
    name: '',
    email: ''
  }
}

export const authAtom = atom<AuthState>({
  key: 'authAtom',
  default: initialAuthState
})
