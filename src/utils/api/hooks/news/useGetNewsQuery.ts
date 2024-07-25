import { useQuery } from '@tanstack/react-query'
import { QuerySettings } from '@utils'

import { getNews } from '../../requests/news/get'

export const useGetNewsQuery = (search: string, settings?: QuerySettings<typeof getNews>) =>
  useQuery({
    queryKey: ['getNews', search],
    queryFn: () => getNews({ params: { search }, config: { ...settings?.config } }),
    ...settings?.options
  })
