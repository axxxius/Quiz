interface AuthState {
  tokens: Tokens
  user: User
}

interface Tokens {
  access_token: string
  refresh_token: string
}

interface User {
  id: number
  username: string
  email: string
  gender: string
  description: string
}
