import { useQuery } from '@tanstack/react-query'
import { QuerySettings } from '@utils'

import { scheduledGames } from '../../requests/news/scheduled-games'

export const useGetScheduledGamesQuery = (settings?: QuerySettings<typeof scheduledGames>) =>
  useQuery({
    queryKey: ['scheduledGames'],
    queryFn: () => scheduledGames(),
    ...settings?.options
  })
