interface AuthState {
  access_token: string
  user: User
}

interface User {
  id: number
  username: string
  email: string
  gender: string
  description: string
}
