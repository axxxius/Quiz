import { useMutation } from '@tanstack/react-query'
import { MutationSettings, register, RegisterConfig } from '@utils'

export const usePostRegisterMutation = (
  settings?: MutationSettings<RegisterConfig, typeof register>
) =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: ({ params, config }) =>
      register({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
