import { useQuery } from '@tanstack/react-query'
import { QuerySettings, refresh } from '@utils'

export const useGetRefreshQuery = (token: string, settings?: QuerySettings<typeof refresh>) =>
  useQuery({
    queryKey: ['refresh'],
    queryFn: () => refresh({ params: { token }, config: settings?.config }),
    ...settings?.options
  })
