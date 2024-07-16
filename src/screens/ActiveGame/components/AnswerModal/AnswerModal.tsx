import { Question, TeamAnswer } from '@screens/ActiveGame/ActiveGame'
import { Typography } from '@shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './AnswerModal.module.css'

interface AnswerModalProps {
  visible: boolean
  onClose: () => void
  teamAnswer:
    | {
        teamId: number
        answer: TeamAnswer
      }
    | undefined
  question: Question | undefined
  changeTeamAnswer: (
    teamId: number,
    questionId: number,
    newAnswer: string,
    weight: number | undefined
  ) => void
  gameStatus: 'active' | 'finished' | 'planned'
}

interface AnswerForm {
  answer: string
  weight: number
}

const AnswerModal = ({
  visible,
  onClose,
  teamAnswer,
  question,
  changeTeamAnswer,
  gameStatus
}: AnswerModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  const { register, handleSubmit, reset } = useForm<AnswerForm>({
    mode: 'onChange'
  })

  useEffect(() => {
    reset({
      answer: teamAnswer?.answer?.answer || '',
      weight: teamAnswer?.answer?.weight || question?.weight || 0
    })
  }, [teamAnswer, question, reset])

  const onSubmit = handleSubmit((data) => {
    changeTeamAnswer(
      teamAnswer?.teamId ?? 0,
      teamAnswer?.answer?.questionId ?? 0,
      data.answer,
      data.weight
    )
    onClose()
  })

  if (!visible) return null

  return (
    <div className={styles.modal_container} onClick={onClose}>
      <form onSubmit={onSubmit} className={styles.container} onClick={(e) => e.stopPropagation()}>
        {gameStatus === 'active' && (
          <>
            <Typography tag='p' variant='text_36_b' style={{ whiteSpace: 'nowrap' }}>
              Оцените ответ команды
            </Typography>
            <Typography tag='p' variant='text_24_b'>
              Введите ответ команды
            </Typography>
            <input
              {...register('answer')}
              id='answer'
              defaultValue={teamAnswer?.answer?.answer}
              className={styles.form_input}
            />
            <Typography tag='p' variant='text_24_b'>
              Введите количество баллов{' '}
            </Typography>
            <input
              {...register('weight')}
              id='weight'
              type='number'
              defaultValue={teamAnswer?.answer?.weight}
              max={question?.weight}
              className={styles.form_input}
            />
            <span className='self-end'>Максимум: {question?.weight}</span>
            <button type='submit' className={styles.save_btn}>
              Сохранить
            </button>
          </>
        )}
        {gameStatus === 'finished' && (
          <>
            <Typography tag='p' variant='text_36_b'>
              Оценка ответа команды
            </Typography>
            <Typography tag='p' variant='text_24_b'>
              Ответ команды: {teamAnswer?.answer?.answer || 'Ответ не дан'}
            </Typography>
            <Typography tag='p' variant='text_24_b'>
              Оценка: {teamAnswer?.answer?.weight || 'Оценка не выставлена'}
            </Typography>
            <button onClick={onClose} type='button' className={styles.save_btn}>
              Закрыть
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default AnswerModal
