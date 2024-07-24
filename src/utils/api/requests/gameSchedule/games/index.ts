import { api } from '@utils'

export type fetchGamesConfig = RequestConfig<{ page: number }>

export const fetchGames = async ({ params }: fetchGamesConfig) =>
  await api.get<GameInSchedule[]>(`/games/?ordering=game_date&&page=${params.page}`)
