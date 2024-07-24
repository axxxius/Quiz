import { useRecoilValue } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom'
import { useMutation } from '@tanstack/react-query'
import { deleteTeam } from '@utils'

export const useDeleteTeamInGameMutation = () => {
  const user = useRecoilValue(authAtom)
  const { mutate } = useMutation({
    mutationKey: ['add-team'],
    mutationFn: async (game_id: number) =>
      deleteTeam({ gameId: game_id, userId: { user_id: user.user.id } })
  })

  return { deleteTeam: mutate }
}
