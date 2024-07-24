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
          answer: Omit<TeamAnswer, 'id'>
          question: Question
        }
      | undefined
    >
  >
  gameId: number
  answers: TeamAnswer[]
  isPending: boolean
}

export const AnswersList = ({
  teamList,
  questions,
  gameStatus,
  changeTeamAnswer,
  setOpenModal,
  setCurrentValues,
  gameId,
  answers,
  isPending
}: AnswersListProps) => {
  const openModal = (answer: TeamAnswer | undefined, teamId: number, questionId: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (!answer) {
      if (question) {
        const newAnswer: Omit<TeamAnswer, 'id'> = {
          question_id: question.id,
          answer_team_answer: '',
          answer_is_correct: false,
          answer_score: 0,
          game_id: gameId,
          team_id: teamId
        }
        setCurrentValues({ teamId, answer: newAnswer, question })
      }
    } else {
      if (question) {
        setCurrentValues({ teamId, answer, question })
      }
    }
    setOpenModal(true)
  }

  const findAnswer = (answers: TeamAnswer[], question: Question, team_id: number): TeamAnswer => {
    const defaultAnswer: TeamAnswer = {
      id: Math.random(),
      question_id: question.id,
      answer_team_answer: '',
      answer_is_correct: false,
      answer_score: 0,
      game_id: gameId,
      team_id: team_id
    }
    const answer = Array.isArray(answers)
      ? answers?.find((answer) => answer.question_id === question.id)
      : defaultAnswer

    return answer || defaultAnswer
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
              const answer = findAnswer(answers, question, team.team_id)
              if (gameStatus === 'finished') {
                if (
                  question.question_correct_answer === 'Да' ||
                  question.question_correct_answer === 'Нет'
                ) {
                  return (
                    <Typography key={question.id}>
                      {answer?.answer_is_correct ? <CheckMark /> : <CrossMark />}
                    </Typography>
                  )
                } else {
                  return (
                    <button onClick={() => openModal(answer, team.team_id, question.id)}>
                      {answer?.answer_is_correct ? <CheckMark /> : <CrossMark />}
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
                      className='outline-none disabled:bg-grey disabled:bg-opacity-45'
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
                      disabled={isPending}
                    >
                      {answer?.answer_is_correct ? <CheckMark /> : <CrossMark />}
                    </button>
                  )
                } else {
                  return (
                    <button
                      className='outline-none disabled:bg-grey disabled:bg-opacity-45'
                      key={question.id}
                      onClick={() => openModal(answer, team.team_id, question.id)}
                      disabled={isPending}
                    >
                      {answer?.answer_is_correct ? <CheckMark /> : <CrossMark />}
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
