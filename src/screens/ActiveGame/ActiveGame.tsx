import { useState } from 'react'

import { AnswerModal, AnswersList, GameInfo, TeamList } from '@screens/ActiveGame/components'
import { Typography } from '@shared'

import styles from './ActiveGame.module.css'

const ActiveGame = () => {
  const [game, setGame] = useState<Game>({
    id: 1,
    name: 'Game 1',
    date: '2024-07-07T19:00:00+03:00',
    description:
      'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1',
    status: 'active',
    questions: [
      {
        id: 1,
        name: '1.111111111',
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
}

export default ActiveGame
