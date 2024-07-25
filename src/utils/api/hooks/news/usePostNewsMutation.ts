import { useMutation } from '@tanstack/react-query'
import { MutationSettings, postNews, PostNewsConfig } from '@utils'

export const usePostNewsMutation = (settings?: MutationSettings<PostNewsConfig, typeof postNews>) =>
  useMutation({
    mutationKey: ['postNews'],
    mutationFn: ({ params, config }) =>
      postNews({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
