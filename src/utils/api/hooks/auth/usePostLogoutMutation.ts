import { useMutation } from '@tanstack/react-query'
import { MutationSettings } from '@utils'

import { logout } from '../../requests/auth/logout'

export const usePostLogoutMutation = (settings?: MutationSettings<typeof logout>) =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    ...settings?.options
  })
