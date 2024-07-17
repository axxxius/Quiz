import { useQuery } from '@tanstack/react-query'

import { getTeam } from '../requests/teams/get{id}'

export const useGetTeamQuery = (id: number) => {
  return useQuery({
    queryKey: ['getTeam', id],
    queryFn: () => getTeam(id)
  })
}
