import { api } from '@utils'

export type PostGameConfig = RequestConfig<
  Pick<GameInSchedule, 'game_name' | 'game_date' | 'game_description' | 'game_status'>
>

export const PostGame = async ({ params }: PostGameConfig) =>
  await api.post<GameInSchedule>('/games/', params)
