import { api, RequestConfig } from '@utils'
import { PostNewsParams } from '@screens/News/components'

export type PostNewsConfig = RequestConfig<PostNewsParams>

export const postNews = async ({ params, config }: PostNewsConfig) =>
  await api.post('/news/', params, config)
