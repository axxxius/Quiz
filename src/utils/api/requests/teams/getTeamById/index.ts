import { FullTeam } from '@screens/Teams/types'
import axios from 'axios'

export const getTeamById = async (id: number) => {
  return await axios.get<FullTeam>(`${import.meta.env.VITE_API_URL}/teams/${id}/`)
}
