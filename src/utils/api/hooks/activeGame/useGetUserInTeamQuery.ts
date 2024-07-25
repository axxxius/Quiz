import { useQuery } from '@tanstack/react-query'
import { getTeamIdInGame } from '@utils'

export const useGetUserInTeamQuery = (gameId: number) => {
  const { data } = useQuery({
    queryKey: ['user-in-team', gameId],
    queryFn: async () => getTeamIdInGame({ gameId: gameId })
  })

  return { userTeam: data }
}
