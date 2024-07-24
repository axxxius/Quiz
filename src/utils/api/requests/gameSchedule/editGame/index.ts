import { api } from '@utils'

export const EditGame = async (game: Omit<GameInSchedule, 'id'>, game_id: number) =>
  await api.put<GameInSchedule>(`/games/${game_id}/`, game)
