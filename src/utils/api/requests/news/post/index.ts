import { api, RequestConfig } from '@utils'

interface Params {
  image: FormData
  title: FormData
  description: FormData
}

export type PostNewsConfig = RequestConfig<Params>

export const postNews = async ({ params, config }: PostNewsConfig) =>
  await api.post('/news/', params, config)
