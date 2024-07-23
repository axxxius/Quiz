import { api } from '@utils'

export const fetchGames = async () =>
  await api.get<GameInSchedule[]>('/games/?ordering=game_date&&page=1')
