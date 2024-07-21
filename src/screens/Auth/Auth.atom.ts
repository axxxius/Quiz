import { atom } from 'recoil'

const initialAuthState: AuthState = {
  accessToken: '',
  user: {
    id: 0,
    username: '',
    email: '',
    gender: '',
    description: ''
  }
}

export const authAtom = atom<AuthState>({
  key: 'auth',
  default: initialAuthState
})
