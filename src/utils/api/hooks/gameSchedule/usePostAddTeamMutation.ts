import { useRecoilValue } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom'
import { useMutation } from '@tanstack/react-query'
import { addTeam } from '@utils'

export const usePostAddTeamMutation = () => {
  const user = useRecoilValue(authAtom)
  const { mutate } = useMutation({
    mutationKey: ['add-team'],
    mutationFn: async (game_id: number) =>
      addTeam({ gameId: game_id, userId: { user_id: user.user.id } })
  })

  return { addTeam: mutate }
}
