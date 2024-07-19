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
  creation_date: string
  played_games: number
  points: number
  rating: number
}

export type FullTeam = {
  team_name: string
  team_desc: string
  team_points: number
  team_rating: number
  captain_name: string
  team_members: UserMember[]
}

export type Option = {
  label: string
  value: string
}

export type TeamValue = {
  captain_id: number
  team_name: string
  team_desc: string
}

interface TeamJoin {
  team_id: number
  user_id: number
}

interface TeamFormValues {
  team_name: string
  team_desc: string
}

interface UserMember {
  username: string
}
