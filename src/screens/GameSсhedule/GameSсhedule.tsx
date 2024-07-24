import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { useRole } from '@hooks'
import { Typography } from '@shared'
import { useGetGamesQuery } from '@utils'

import { GameTable, NewGameModal } from './components'
import { gameScheduleState } from './GameSchedule.atom'
import styles from './GameSсhedule.module.css'

const GameShedule = () => {
  const userRole = useRole()
  const [role, setRole] = useState('player')
  useEffect(() => {
    if (userRole.role !== undefined) {
      setRole(userRole.role)
    }
  }, [userRole])
  console.log(userRole)

  const [page, setPage] = useState<number>(1)
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
            {role === 'leading' ? (
              <button className={styles.new_game_btn} onClick={() => setNewGameModalOpen(true)}>
                Добавить игру
              </button>
            ) : (
              <Typography variant='text_20_b' className='text-center'>
                Вы не можете создавать игры
              </Typography>
            )}
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
        <div className={styles.pagination_container}>
          <button
            className={styles.pagination_btns}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            &lt;- Предыдущая
          </button>
          <Typography variant='text_20_b'>Страница {page}</Typography>
          <button
            className={styles.pagination_btns}
            onClick={() => setPage(page + 1)}
            disabled={games.length < 10}
          >
            Следующая -&gt;
          </button>
        </div>
      </div>
      <NewGameModal visible={newGameModalOpen} onClose={() => setNewGameModalOpen(false)} />
    </>
  )
}

export default GameShedule
