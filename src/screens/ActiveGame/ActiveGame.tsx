import { Typography } from '@shared'
import { memo, useState } from 'react'
import styles from './ActiveGame.module.css'
import AnswerModal from './components/AnswerModal/AnswerModal'
import AnswersList from './components/AnswersList/AnswersList'
import GameInfo from './components/GameTitle/GameInfo'
import TeamList from './components/TeamList/TeamList'

export interface Question {
  id: number
  name: string
  question: string
  etalon: string
  weight: number //количество баллов за вопрос
}

export interface Game {
  id: number
  status: 'active' | 'finished' | 'planned'
  date?: string
  name: string
  description: string
  questions: Question[]
}

export interface TeamAnswer {
  id: number
  questionId: number
  answer: string
  weight: number
}

export interface TeamInGame {
  id: number
  name: string
  points: number
  answers: TeamAnswer[]
}

const ActiveGame = memo(() => {
  const [game, setGame] = useState<Game>({
    id: 1,
    status: 'active',
    name: 'Game 1',
    description:
      'Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description Game 1 description ',
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
  })

  const [teamList, setTeamList] = useState<TeamInGame[]>([
    {
      id: 1,
      name: 'Бездари',
      points: 0,
      answers: [
        {
          id: 1,
          questionId: 1,
          answer: 'Фридрих',
          weight: 16
        },
        {
          id: 3,
          questionId: 3,
          answer: 'Да',
          weight: 200
        },
        {
          id: 4,
          questionId: 4,
          answer: 'Мурзек',
          weight: 1
        }
      ]
    },
    {
      id: 2,
      name: '2к узники',
      points: 0,
      answers: []
    },
    {
      id: 3,
      name: 'Муравьи',
      points: 0,
      answers: []
    },
    {
      id: 4,
      name: 'Сфинксы',
      points: 0,
      answers: []
    },
    {
      id: 5,
      name: 'Котики',
      points: 0,
      answers: []
    },
    {
      id: 6,
      name: 'Лягушки',
      points: 0,
      answers: []
    },
    {
      id: 7,
      name: 'Тарзанчики',
      points: 0,
      answers: []
    },
    {
      id: 8,
      name: 'Жирафы',
      points: 0,
      answers: []
    },
    {
      id: 9,
      name: 'ПингвиныПингвиныПингвиныПингвиныПингвиныПингвиныПингвиныПингвины',
      points: 0,
      answers: []
    },
    {
      id: 10,
      name: 'Зебры',
      points: 0,
      answers: []
    },
    {
      id: 11,
      name: 'Крокодилы',
      points: 0,
      answers: []
    },
    {
      id: 12,
      name: 'Попугаи',
      points: 0,
      answers: []
    }
  ])

  const changeGameStatus = (newStatus: 'active' | 'finished' | 'planned') => {
    setGame({ ...game, status: newStatus })
  }

  const changeTeamAnswer = (
    teamId: number,
    questionId: number,
    newAnswer: string,
    weight: number | undefined
  ) => {
    setTeamList((prevTeamList) =>
      prevTeamList.map((team) => {
        if (team.id === teamId) {
          // Проверяем, есть ли уже ответ на этот вопрос
          const existingAnswerIndex = team.answers?.findIndex(
            (answer) => answer.questionId === questionId
          )
          if (existingAnswerIndex !== undefined && existingAnswerIndex >= 0) {
            // Если ответ существует, обновляем его
            const updatedAnswers = [...(team.answers ?? [])]
            updatedAnswers[existingAnswerIndex] = {
              ...updatedAnswers[existingAnswerIndex],
              answer: newAnswer,
              weight: weight ?? 0
            }
            return { ...team, answers: updatedAnswers }
          } else {
            // Если ответа нет, добавляем новый
            const newAnswerObj: TeamAnswer = {
              id: Math.random(),
              questionId,
              answer: newAnswer,
              weight: weight ?? 0
            } // Пример генерации ID
            return { ...team, answers: [...(team.answers ?? []), newAnswerObj] }
          }
        }
        return team
      })
    )
    console.log(teamList)
  }

  const [openModal, setOpenModal] = useState(false)
  const [currentValues, setCurrentValues] = useState<{ teamId: number; answer: TeamAnswer }>()

  return (
    <>
      <div className={styles.container}>
        <GameInfo game={game} changeGameStatus={changeGameStatus} />
        <div className={styles.game_container}>
          <Typography tag='p' variant='text_24_b'>
            Игра
          </Typography>
          <div className={styles.table_container}>
            <TeamList teamList={teamList} />
            <AnswersList
              teamList={teamList}
              questions={game.questions}
              gameStatus={game.status}
              changeTeamAnswer={changeTeamAnswer}
              setOpenModal={setOpenModal}
              setCurrentValues={setCurrentValues}
            />
          </div>
        </div>
      </div>
      <AnswerModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        teamAnswer={currentValues}
        question={game.questions.find(
          (question) => currentValues?.answer?.questionId === question.id
        )}
        changeTeamAnswer={changeTeamAnswer}
        gameStatus={game.status}
      />
    </>
  )
})

export default ActiveGame
