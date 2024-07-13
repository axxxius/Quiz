import { Button, Typography } from '@shared'
import { memo } from 'react'
import styles from './ActiveGame.module.css'
import AnswersList from './components/AnswersList/AnswersList'
import TeamList from './components/TeamList/TeamList'

interface Question {
  id: number
  name: string
  question: string
  etalon?: string | boolean
  weight: number //количество баллов за вопрос
}

interface Game {
  id: number
  status: 'now' | 'finished' | 'planned'
  name: string
  description: string
  questions: Question[]
}

export interface TeamInGame {
  id: number
  name: string
  points: number
  answers?: {
    id: number
    questionId: number
    answer: boolean | string | null
  }[]
}

const ActiveGame = memo(() => {
  const game: Game = {
    id: 1,
    status: 'now',
    name: 'Game 1',
    description: 'Game 1 description',
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
        etalon: 'Нет',
        weight: 1
      },
      {
        id: 3,
        name: '1.3',
        question: 'Бывают ли тарзанчики у сфинксов?',
        etalon: 'Да',
        weight: 200
      },
      {
        id: 4,
        name: '1.4',
        question: 'Как зовут котика?',
        etalon: 'Мурзик',
        weight: 3
      },
      {
        id: 5,
        name: '1.5',
        question: 'Как зовут пингвина?',
        etalon: 'Тузик',
        weight: 5
      },
      {
        id: 6,
        name: '1.6',
        question: 'Как зовут зебру?',
        etalon: 'Полосатик',
        weight: 5
      },
      {
        id: 7,
        name: '1.7',
        question: 'Как зовут крокодила?',
        etalon: 'Геннадий',
        weight: 5
      },
      {
        id: 8,
        name: '1.8',
        question: 'Как зовут попугая?',
        etalon: 'Кеша',
        weight: 5
      },
      {
        id: 9,
        name: '1.9',
        question: 'Как зовут муравья?',
        etalon: 'Коля',
        weight: 5
      },
      {
        id: 10,
        name: '1.10',
        question: 'Как зовут сфинкса?',
        etalon: 'Сфинкс',
        weight: 5
      },
      {
        id: 11,
        name: '1.11',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 12,
        name: '1.12',
        question: 'Как зовут лягушку?',
        etalon: 'Лягушка',
        weight: 5
      },
      {
        id: 13,
        name: '1.13',
        question: 'Как зовут тарзанчика?',
        etalon: 'Тарзанчик',
        weight: 5
      },
      {
        id: 14,
        name: '1.14',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 15,
        name: '1.15',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 16,
        name: '1.16',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 17,
        name: '1.17',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 18,
        name: '1.18',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 19,
        name: '1.19',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      },
      {
        id: 20,
        name: '1.20',
        question: 'Как зовут жирафа?',
        etalon: 'Фридрех',
        weight: 5
      }
    ]
  }

  const teamList: TeamInGame[] = [
    {
      id: 1,
      name: 'Бездари',
      points: 0,
      answers: [
        {
          id: 1,
          questionId: 1,
          answer: 'Фридрех'
        },
        {
          id: 3,
          questionId: 3,
          answer: true
        }
      ]
    },
    {
      id: 2,
      name: '2к узники',
      points: 0
    },
    {
      id: 3,
      name: 'Муравьи',
      points: 0
    },
    {
      id: 4,
      name: 'Сфинксы',
      points: 0
    },
    {
      id: 5,
      name: 'Котики',
      points: 0
    },
    {
      id: 6,
      name: 'Лягушки',
      points: 0
    },
    {
      id: 7,
      name: 'Тарзанчики',
      points: 0
    },
    {
      id: 8,
      name: 'Жирафы',
      points: 0
    },
    {
      id: 9,
      name: 'Пингвины',
      points: 0
    },
    {
      id: 10,
      name: 'Зебры',
      points: 0
    },
    {
      id: 11,
      name: 'Крокодилы',
      points: 0
    },
    {
      id: 12,
      name: 'Попугаи',
      points: 0
    }
  ]

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
              {game.questions.length}
            </Typography>
          </div>
          <Button variant='primary_regular'>Завершить игру</Button>
        </div>
      </div>
      <div className={styles.game_container}>
        <Typography tag='p' variant='text_24_b'>
          Игра
        </Typography>
        <div className={styles.table_container}>
          <TeamList teamList={teamList} />
          <AnswersList teamList={teamList} questions={game.questions} />
        </div>
      </div>
    </div>
  )
})

export default ActiveGame
