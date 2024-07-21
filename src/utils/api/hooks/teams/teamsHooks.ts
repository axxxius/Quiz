import { AxiosError, AxiosResponse } from 'axios'

import { FullTeam, Team, TeamJoin, TeamValue } from '@screens/Teams'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteTeamById, getTeamById, getTeams, joinTeam, postTeam } from '@utils'

export interface AxiosResponseData {
  teams: Team[]
}

export interface AxiosErrorData {
  detail: string
}

export const useDeleteTeamMutation = (id: number) => {
  return useMutation<AxiosResponse<any, any>, AxiosError<AxiosErrorData, any>, number, unknown>({
    mutationKey: ['deleteTeam', id],
    mutationFn: (id: number) => deleteTeamById(id)
  })
}

export const useGetTeamQuery = (id: number) => {
  return useQuery<
    AxiosResponse<FullTeam, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<FullTeam, any>,
    (string | number)[]
  >({
    queryKey: ['getTeam', id],
    queryFn: () => getTeamById(id)
  })
}

export const useGetTeamsQuery = () => {
  return useQuery<
    AxiosResponse<AxiosResponseData, any>,
    AxiosError<AxiosErrorData, any>,
    AxiosResponse<AxiosResponseData, any>,
    string[]
  >({
    queryKey: ['getTeams'],
    queryFn: () => getTeams()
  })
}

export const useJoinTeamMutation = (id: number) => {
  return useMutation<
    AxiosResponse<TeamJoin, any>,
    AxiosError<AxiosErrorData, any>,
    number,
    unknown
  >({
    mutationKey: ['sendTeam', id],
    mutationFn: (id: number) => joinTeam(id)
  })
}

export const usePostTeamMutation = () => {
  return useMutation<AxiosResponse<Team, any>, AxiosError<AxiosErrorData, any>, TeamValue, unknown>(
    {
      mutationKey: ['sendTeam'],
      mutationFn: (teamValue: TeamValue) => postTeam(teamValue)
    }
  )
}
