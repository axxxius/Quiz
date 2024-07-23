import { atom } from 'recoil'

const initialGameSchedule: GameInSchedule[] = [
  {
    id: 1,
    game_name: 'game_name',
    game_description: 'game_description',
    game_date: '2024-07-23T22:48:00+05:00',
    game_status: 'active'
  }
]

export const gameScheduleState = atom<GameInSchedule[]>({
  key: 'gamesScheduleState',
  default: initialGameSchedule
})
