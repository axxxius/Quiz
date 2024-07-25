import { api } from '@utils'

export interface Game {
  id: number
  game_name: string
  game_description: string
  game_date: string
  game_status: string
}

export const scheduledGames = async () => await api.get<Game[]>('scheduled-games/')
