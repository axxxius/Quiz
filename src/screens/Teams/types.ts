export type Team = {
  readonly team_id: number
  team_name: string
  team_desc: string
  team_creation_date: string
  team_played_games: number
  team_points: number
  team_place: number
  captain_id: number
}

export type FullTeam = {
  readonly team_id?: number
  team_name: string
  team_desc: string
  team_creation_date: string
  team_played_games: number
  team_points: number
  team_place: number
  team_captain_id?: number
  team_captain_name: string
  team_members: UserMember[]
}

export type OptionSort = {
  label: string
  value: string
}

export type TeamValue = {
  readonly captain_id: number
  team_name: string
  team_desc: string
}

export interface CreatingTeamFormValues {
  team_name: string
  team_desc: string
}

export interface UserMember {
  id: number
  username: string
}

export interface TeamUpdateValue {
  team_name: string
  team_desc: string
}

export interface AxiosResponseData {
  teams: Team[]
}

export interface AxiosErrorData {
  [index: string]: string
}

export interface UserTeams {
  team_id: number
  team_name: string
}

export type UserType = {
  user_id: number
  user_name: string
  user_email: string
  user_role: string
  user_gender: string
  is_captain: boolean
  user_teams: UserTeams[]
}
