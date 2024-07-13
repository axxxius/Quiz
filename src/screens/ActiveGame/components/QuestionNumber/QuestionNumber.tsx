import TooltilArrow from '@assets/icons/tooltipArrow.svg?react'
import { Typography } from '@shared'
import styles from './QuestionNumber.module.css'

interface Question {
  id: number
  name: string
  question: string
  etalon?: string | boolean
  weight: number //количество баллов за вопрос
}

const QuestionNumber = ({ question }: { question: Question }) => {
  return (
    <div className={styles.question_container}>
      <Typography className={styles.question_name} variant='text_16_b'>
        {question.name}
      </Typography>
      <div className={styles.hover_container}>
        <div className='rounded-sm bg-white p-2'>
          <Typography variant='text_12_m' className={styles.question_question}>
            {question.question}
          </Typography>
          <div className='flex justify-between gap-x-2'>
            <Typography variant='text_12_m' className={styles.question_etalon}>
              {question.etalon}
            </Typography>
            <Typography variant='text_12_m' className={styles.question_weight}>
              Баллы: {question.weight}
            </Typography>
          </div>
        </div>
        <TooltilArrow className={styles.tooltip_arrow} />
      </div>
    </div>
  )
}

export default QuestionNumber
