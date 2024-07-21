interface Game {
  readonly id: number
  name: string
  description: string
  date: string
  status: 'active' | 'finished' | 'planned'
  questions: Question[]
  leading?: string
  teams?: {
    readonly id: number
    name: string
  }[]
}
