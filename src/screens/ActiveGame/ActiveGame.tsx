import { Button, Typography } from '@shared'
import { memo } from 'react'
import styles from './ActiveGame.module.css'

interface Question {
  id: number
  name: string
  question: string
  etalon?: string | boolean
  weight: number //количество баллов
}

interface Game {
  id: number
  name: string
  description: string
  questionsCount: number
  questions: Question[]
}

const ActiveGame = memo(() => {
  const game: Game = {
    id: 1,
    name: 'Game 1',
    description: 'Game 1 description',
    questionsCount: 10,
    questions: [
      {
        id: 1,
        name: '1.1',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 18
      },
      {
        id: 2,
        name: '1.2',
        question: 'Водятся ли лягушки в голове?',
        etalon: false,
        weight: 1
      },
      {
        id: 3,
        name: '1.3',
        question: 'Бывают ли тарзанчики у сфинксов?',
        weight: 200
      }
    ]
  }

  // const teamList = [
  //   {
  //     id: 1,
  //     name: 'Бездари'
  //   },
  //   {
  //     id: 2,
  //     name: '2к узники'
  //   },
  //   {
  //     id: 3,
  //     name: 'Муравьи'
  //   },
  //   {
  //     id: 4,
  //     name: 'Сфинксы'
  //   }
  // ]

  return (
    <div className={styles.container}>
      <div className={styles.game_info}>
        <div className={styles.left_container}>
          <p className='mb-6 font-vela-bold text-4xl'>{game.name}</p>
          <Typography tag='p' variant='text_24_b'>
            Описание
          </Typography>
          <Typography tag='p' variant='text_20_m'>
            {game.description}
          </Typography>
        </div>
        <div className={styles.right_container}>
          <div className={styles.question_count}>
            <Typography tag='p' variant='text_20_b'>
              Количество вопросов
            </Typography>
            <Typography tag='p' variant='text_36_b' className='text-4xl'>
              {game.questionsCount}
            </Typography>
          </div>
          <Button variant='primary_regular'>Завершить игру</Button>
        </div>
      </div>
      <div className={styles.game_container}>
        <Typography tag='p' variant='text_24_b'>
          Игра
        </Typography>
        <div className={styles.game_container}>
          <div className={styles.game_header}></div>
        </div>
      </div>
    </div>
  )
})

export default ActiveGame
