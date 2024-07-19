interface AuthState {
  accessToken: string | undefined
  user: User
}

interface User {
  id: string
  name: string
  email: string
}
