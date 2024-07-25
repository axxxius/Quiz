import { api, RequestConfig } from '@utils'

export interface News {
  id: number
  title: string
  description: string
  image: string
}

export type GetNewsConfig = RequestConfig<{ search: string }>

export const getNews = async ({ params, config }: GetNewsConfig) =>
  await api.get<News[]>('/news/', {
    params,
    ...config
  })
