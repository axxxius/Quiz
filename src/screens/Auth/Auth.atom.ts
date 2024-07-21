import { atom } from 'recoil'

const initialAuthState: AuthState = {
  access_token: '',
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
