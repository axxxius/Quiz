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
  team_members: string[]
}

export type ShowModal = {
  creatingTeam: boolean
  team: boolean
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
