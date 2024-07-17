import CheckMark from '@assets/icons/checkmark.svg?react'
import CrossMark from '@assets/icons/crossmark.svg?react'
import { QuestionNumber } from '@screens/ActiveGame/components'
import { Typography } from '@shared'

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
}

export const AnswersList = ({
  teamList,
  questions,
  gameStatus,
  changeTeamAnswer,
  setOpenModal,
  setCurrentValues
}: AnswersListProps) => {
  const openModal = (answer: TeamAnswer | undefined, teamId: number, questionId: number) => {
    if (!answer) {
      const question = questions.find((q) => q.id === questionId)
      if (question) {
        const newAnswer: TeamAnswer = {
          id: Date.now(),
          questionId: question.id,
          answer: '',
          weight: 0
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
            key={team.id}
            className={styles.team_entry}
            style={{ gridTemplateColumns: `repeat(${questions.length}, 24px)` }}
          >
            {questions.map((question) => {
              const answer = team.answers?.find((answer) => answer.questionId === question.id)
              if (gameStatus === 'finished') {
                if (question.correctAnswer === 'Да' || question.correctAnswer === 'Нет') {
                  return (
                    <Typography key={question.id}>
                      {answer?.answer === question.correctAnswer ? <CheckMark /> : <CrossMark />}
                    </Typography>
                  )
                } else {
                  return (
                    <button onClick={() => openModal(answer, team.id, question.id)}>
                      {((answer?.answer || answer?.weight) ?? 0) !== 0 ? (
                        <CheckMark />
                      ) : (
                        <CrossMark />
                      )}
                    </button>
                  )
                }
              }
              if (gameStatus === 'active') {
                if (question.correctAnswer === 'Да' || question.correctAnswer === 'Нет') {
                  return (
                    <button
                      className='outline-none'
                      onClick={() => {
                        if (answer?.answer !== question.correctAnswer) {
                          changeTeamAnswer(
                            team.id,
                            question.id,
                            question.correctAnswer,
                            question.weight
                          )
                        } else {
                          changeTeamAnswer(team.id, question.id, '', 0)
                        }
                      }}
                      key={question.id}
                    >
                      {answer?.answer === question.correctAnswer ? <CheckMark /> : <CrossMark />}
                    </button>
                  )
                } else {
                  return (
                    <button
                      className='outline-none'
                      key={question.id}
                      onClick={() => openModal(answer, team.id, question.id)}
                    >
                      {((answer?.answer || answer?.weight) ?? 0) !== 0 ? (
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
