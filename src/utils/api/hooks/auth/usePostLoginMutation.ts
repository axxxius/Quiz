import { useMutation } from '@tanstack/react-query'
import { login, LoginConfig, MutationSettings } from '@utils'

export const usePostLoginMutation = (settings?: MutationSettings<LoginConfig, typeof login>) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: ({ params, config }) =>
      login({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
