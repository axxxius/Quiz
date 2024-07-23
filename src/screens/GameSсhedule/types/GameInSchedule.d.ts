interface GameInSchedule {
  readonly id: number
  game_name: string
  game_description: string
  game_date: string
  game_status: 'active' | 'planned' | 'finished'
}
