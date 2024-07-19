import { useQuery } from '@tanstack/react-query'

import { getTeamById } from '../requests/teams/get{id}'

export const useGetTeamQuery = (id: number) => {
  return useQuery({
    queryKey: ['getTeam', id],
    queryFn: () => getTeamById(id)
  })
}
