interface Game {
  readonly id: number
  game_name: string
  game_description: string
  game_date: string
  game_status: 'active' | 'finished' | 'planned'
  game_creator: string | null
  game_questions: Question[] | []
  game_teams?:
    | {
        readonly team_id: number
        team_name: string
      }[]
    | []
}
