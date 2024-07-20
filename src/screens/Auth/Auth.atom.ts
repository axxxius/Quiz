import { atom } from 'recoil'

const initialAuthState: AuthState = {
  accessToken: '',
  user: {
    id: '',
    username: '',
    email: '',
    gender: ''
  }
}

export const authAtom = atom<AuthState>({
  key: 'auth',
  default: initialAuthState
})
