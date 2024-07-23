import { useMutation } from '@tanstack/react-query'
import { logout, LogoutConfig, MutationSettings } from '@utils'

export const usePostLogoutMutation = (settings?: MutationSettings<LogoutConfig, typeof logout>) =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: ({ params, config }) =>
      logout({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
