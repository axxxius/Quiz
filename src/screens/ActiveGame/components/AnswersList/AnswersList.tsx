import { useEffect, useState } from 'react'

import CheckMark from '@assets/icons/checkmark.svg?react'
import CrossMark from '@assets/icons/crossmark.svg?react'
import { QuestionNumber } from '@screens/ActiveGame/components'
import { Typography } from '@shared'
import { useGetAnswerQuery } from '@utils'

import styles from './AnswersList.module.css'

interface AnswersListProps {
  teamList: TeamInGame[]
  changeTeamAnswer: (
    teamId: number,
    questionId: number,
    newAnswer: string,
    weight: number | undefined
  ) => void
  questions: Question[]
  gameStatus: 'active' | 'finished' | 'planned'
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentValues: React.Dispatch<
    React.SetStateAction<
      | {
          teamId: number
          answer: TeamAnswer
        }
      | undefined
    >
  >
  gameId: number
}

const initialAnswer: TeamAnswer[] = [
  {
    id: 0,
    answer_team_answer: 'string',
    answer_is_correct: true,
    answer_score: 0,
    game_id: 0,
    team_id: 0,
    question_id: 0
  }
]

export const AnswersList = ({
  teamList,
  questions,
  gameStatus,
  changeTeamAnswer,
  setOpenModal,
  setCurrentValues,
  gameId
}: AnswersListProps) => {
  const { data } = useGetAnswerQuery(gameId)
  const [answers, setAnswers] = useState<TeamAnswer[]>(initialAnswer)

  useEffect(() => {
    if (data !== undefined && data.length > 1) {
      setAnswers(data)
    }
  })

  const openModal = (answer: TeamAnswer | undefined, teamId: number, questionId: number) => {
    if (!answer) {
      const question = questions.find((q) => q.id === questionId)
      if (question) {
        const newAnswer: TeamAnswer = {
          id: Date.now(),
          question_id: question.id,
          answer_team_answer: '',
          answer_is_correct: false,
          answer_score: 0,
          game_id: gameId,
          team_id: teamId
        }
        setCurrentValues({ teamId, answer: newAnswer })
      }
    } else {
      setCurrentValues({ teamId, answer })
    }
    setOpenModal(true)
  }

  return (
    <div className={styles.container}>
      <ul
        className={styles.questions_list}
        style={{ gridTemplateColumns: `repeat(${questions.length}, 24px)` }}
      >
        {questions.map((question) => (
          <QuestionNumber key={question.id} question={question} />
        ))}
      </ul>
      <div className={styles.answers_list}>
        {teamList.map((team) => (
          <div
            key={team.team_id}
            className={styles.team_entry}
            style={{ gridTemplateColumns: `repeat(${questions.length}, 24px)` }}
          >
            {questions.map((question) => {
              const answer = answers?.find((answer) => answer.question_id === question.id)
              if (gameStatus === 'finished') {
                if (
                  question.question_correct_answer === 'Да' ||
                  question.question_correct_answer === 'Нет'
                ) {
                  return (
                    <Typography key={question.id}>
                      {answer?.answer_team_answer === question.question_correct_answer ? (
                        <CheckMark />
                      ) : (
                        <CrossMark />
                      )}
                    </Typography>
                  )
                } else {
                  return (
                    <button onClick={() => openModal(answer, team.team_id, question.id)}>
                      {((answer?.answer_team_answer || answer?.answer_score) ?? 0) !== 0 ? (
                        <CheckMark />
                      ) : (
                        <CrossMark />
                      )}
                    </button>
                  )
                }
              }
              if (gameStatus === 'active') {
                if (
                  question.question_correct_answer === 'Да' ||
                  question.question_correct_answer === 'Нет'
                ) {
                  return (
                    <button
                      className='outline-none'
                      onClick={() => {
                        if (answer?.answer_team_answer !== question.question_correct_answer) {
                          changeTeamAnswer(
                            team.team_id,
                            question.id,
                            question.question_correct_answer,
                            question.question_weight
                          )
                        } else {
                          changeTeamAnswer(team.team_id, question.id, '', 0)
                        }
                      }}
                      key={question.id}
                    >
                      {answer?.answer_team_answer === question.question_correct_answer ? (
                        <CheckMark />
                      ) : (
                        <CrossMark />
                      )}
                    </button>
                  )
                } else {
                  return (
                    <button
                      className='outline-none'
                      key={question.id}
                      onClick={() => openModal(answer, team.team_id, question.id)}
                    >
                      {((answer?.answer_team_answer || answer?.answer_score) ?? 0) !== 0 ? (
                        <CheckMark />
                      ) : (
                        <CrossMark />
                      )}
                    </button>
                  )
                }
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
