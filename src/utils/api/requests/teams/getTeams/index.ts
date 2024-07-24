import axios, { AxiosRequestConfig } from 'axios'

import { TeamsTable } from '@screens/Teams/components/Table/Table.atom'

export const getTeams = async ({ params }: AxiosRequestConfig<{ ordering: string }>) => {
  return await axios.get<TeamsTable>(`${import.meta.env.VITE_API_URL}/teams/`, { params })
}
