export type MockTeam = {
  id: number
  team_name: string
  creation_date: string
  played_games: number
  points: number
  rating: number
  team_desc?: string
  captain_name?: string
  team_members?: string[]
}

export type Team = {
  team_id: number
  team_name: string
  team_desc: string
  team_creation_date: string
  team_played_games: number
  team_points: number
  team_rating: number
  captain_id: number
}

export type FullTeam = {
  readonly team_id?: number
  team_name: string
  team_desc: string
  team_creation_date: string
  team_played_games: number
  team_points: number
  team_rating: number
  team_captain_id?: number
  team_captain_name: string
  team_members: UserMember[]
}

export type OptionSort = {
  label: string
  value: string
}

export type TeamValue = {
  captain_id: number
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
  detail: string
}
