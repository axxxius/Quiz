import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { Typography } from '@shared'
import { useGetGamesQuery } from '@utils'

import { GameTable, NewGameModal } from './components'
import { gameScheduleState } from './GameSchedule.atom'
import styles from './GameSсhedule.module.css'

const GameShedule = () => {
  const role: TRole = 'admin'

  const { data } = useGetGamesQuery()
  const [games, setGames] = useRecoilState(gameScheduleState)
  useEffect(() => {
    if (data !== undefined) {
      setGames(data)
    }
  }, [data])

  const [currentStatus, setCurrentStatus] = useState(false) // true - finished, false - planned and active

  const [newGameModalOpen, setNewGameModalOpen] = useState(false)

  return (
    <>
      <div className={styles.container}>
        <Typography tag='h1' variant='text_36_b'>
          Расписание игр
        </Typography>
        <div className={styles.main_container}>
          <div className={styles.filter_container}>
            <input type='text' placeholder='Поиск...' className={styles.filter_input} />
            <button className={styles.new_game_btn} onClick={() => setNewGameModalOpen(true)}>
              Добавить игру
            </button>
          </div>
          <div className={styles.second_filter_container}>
            <Typography tag='div' variant='text_16_r'>
              <span className='mr-6'>Сортировать по</span>
              <select className={styles.select}>
                <option value='date'>Дате создания</option>
                <option value='status'>Статусу</option>
              </select>
            </Typography>
            <button
              className={styles.end_games_btn}
              onClick={() => setCurrentStatus(!currentStatus)}
            >
              {currentStatus ? 'Запланированные игры' : 'Прошедшие игры'}
            </button>
          </div>
          <GameTable
            games={
              games.filter((game) =>
                currentStatus
                  ? game.game_status === 'finished'
                  : game.game_status === 'active' || game.game_status === 'planned'
              ) ?? []
            }
            role={role}
          />
        </div>
      </div>
      <NewGameModal visible={newGameModalOpen} onClose={() => setNewGameModalOpen(false)} />
    </>
  )
}

export default GameShedule
