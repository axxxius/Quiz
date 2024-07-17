import { Typography } from '@shared'
import { useState } from 'react'
import styles from './GameShedule.module.css'
import GameTable from './components/GameTable/GameTable'

const GameShedule = () => {
  const role = 'admin'

  const games: Game[] = [
    {
      id: 1,
      name: 'Game 1',
      date: '2024-07-07T19:00:00+03:00',
      description: 'Description 1',
      status: 'active',
      questions: [
        {
          id: 1,
          name: '1.1',
          description: 'Как зовут жирафа?',
          correctAnswer: 'Фридрeх',
          weight: 16
        },
        {
          id: 2,
          name: '1.2',
          description: 'Сколько ног у паука?',
          correctAnswer: 'кто напишет 8 тот лох',
          weight: 21
        }
      ]
    },
    {
      id: 2,
      name: 'Game 2',
      date: '2024-06-07T19:00:00+03:00',
      status: 'finished',
      description: 'Description 2',
      questions: []
    }
  ]

  const [currentStatus, setCurrentStatus] = useState(false) // true - finished, false - planned and active

  return (
    <div className={styles.container}>
      <Typography tag='h1' variant='text_36_b'>
        Расписание игр
      </Typography>
      <div className={styles.main_container}>
        <div className={styles.filter_container}>
          <input type='text' placeholder='Поиск...' className={styles.filter_input} />
          <button className={styles.new_game_btn}>Добавить игру</button>
        </div>
        <div className={styles.second_filter_container}>
          <Typography tag='div' variant='text_16_r'>
            <span className='mr-2'>Сортировать по</span>
            <select className={styles.select}>
              <option value='date'>Дате создания</option>
              <option value='status'>Статусу</option>
            </select>
          </Typography>
          <button className={styles.end_games_btn} onClick={() => setCurrentStatus(!currentStatus)}>
            {currentStatus ? 'Запланированные игры' : 'Прошедшие игры'}
          </button>
        </div>
        <GameTable
          games={games.filter((game) =>
            currentStatus
              ? game.status === 'finished'
              : game.status === 'active' || game.status === 'planned'
          )}
          role={role}
        />
      </div>
    </div>
  )
}

export default GameShedule
