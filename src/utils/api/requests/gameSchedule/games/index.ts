import { api } from '@utils'

export const fetchGames = async ({ page }: { page: number }) =>
  await api.get<GameInSchedule[]>(`/games/?ordering=game_date&&page=` + page)
