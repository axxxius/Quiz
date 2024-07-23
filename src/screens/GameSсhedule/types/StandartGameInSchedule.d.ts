interface StandartGameInSchedule {
  game_name: string
  game_description: string
  game_date: string
  game_time: string
  game_status: 'active' | 'planned' | 'finished'
}
