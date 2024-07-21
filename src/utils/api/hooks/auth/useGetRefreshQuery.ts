import { useQuery } from '@tanstack/react-query'
import { QuerySettings, refresh } from '@utils'

export const useGetRefreshQuery = (settings?: QuerySettings<typeof refresh>) =>
  useQuery({
    queryKey: ['refresh'],
    queryFn: () => refresh(),
    ...settings?.options
  })
