import { api } from '@utils'

export const logout = async () => await api.post('/auth/logout/')
