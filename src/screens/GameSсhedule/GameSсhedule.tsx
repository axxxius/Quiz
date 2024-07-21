import { useState } from 'react'

import { GameTable, NewGameModal } from '@screens/GameSсhedule/components'
import { Typography } from '@shared'

import styles from './GameSсhedule.module.css'

const GameShedule = () => {
  const role: TRole = 'admin'

  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      name: 'Game 1 Game 1 Game 1 Game 1 Game 1 Game 1 Game 1 Game 1 Game 1 Game 1',
      date: '2024-07-07T19:00:00+03:00',
      description:
        'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 ',
      status: 'planned',
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
      ],
      teams: [
        {
          id: 1,
          name: 'Team 1'
        },
        {
          id: 2,
          name: 'Team 2'
        },
        {
          id: 3,
          name: 'Team 3'
        },
        {
          id: 4,
          name: 'Team 4'
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
  ])

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
            games={games.filter((game) =>
              currentStatus
                ? game.status === 'finished'
                : game.status === 'active' || game.status === 'planned'
            )}
            role={role}
            setGames={setGames}
          />
        </div>
      </div>
      <NewGameModal
        visible={newGameModalOpen}
        onClose={() => setNewGameModalOpen(false)}
        setGames={setGames}
      />
    </>
  )
}

export default GameShedule
