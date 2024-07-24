import { api, RequestConfig } from '@utils'

export type fetchGameConfig = RequestConfig<{ game_id: number }>

export const getGame = async ({ params }: fetchGameConfig) =>
  await api.get<Game>(`/games/${params.game_id}/`)
