interface AuthState {
  accessToken: string
  user: User
}

interface User {
  id: string
  username: string
  email: string
  gender: string
}
