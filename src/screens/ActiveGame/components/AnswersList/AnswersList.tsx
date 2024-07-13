import CheckMark from '@assets/icons/checkmark.svg?react'
import CrossMark from '@assets/icons/crossmark.svg?react'
import { TeamInGame } from '@screens/ActiveGame/ActiveGame'
import { Typography } from '@shared'

import styles from './AnswersList.module.css'

interface AnswersListProps {
  teamList: TeamInGame[]
  questions: {
    id: number
    name: string
    question: string
    etalon?: string | boolean
    weight: number
  }[]
}

const AnswersList = ({ teamList, questions }: AnswersListProps) => {
  return (
    <div className={styles.container}>
      <ul
        className={styles.questions_list}
        style={{ gridTemplateColumns: `repeat(${questions.length}, 24px)` }}
      >
        {questions.map((question) => (
          <Typography key={question.id}>{question.name}</Typography>
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
              return (
                <Typography key={question.id}>
                  {answer?.answer === question.etalon ? <CheckMark /> : <CrossMark />}
                </Typography>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnswersList
