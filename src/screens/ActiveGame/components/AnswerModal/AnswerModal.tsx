import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import ModalClose from '@assets/icons/modalCross.svg?react'
import { Modal2, Typography } from '@shared'

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

export const AnswerModal = ({
  visible,
  onClose,
  teamAnswer,
  question,
  changeTeamAnswer,
  gameStatus
}: AnswerModalProps) => {
  const { register, handleSubmit, reset } = useForm<AnswerForm>({
    mode: 'onChange'
  })

  useEffect(() => {
    reset({
      answer: teamAnswer?.answer?.answer_team_answer || '',
      weight: teamAnswer?.answer?.answer_score || question?.question_weight || 0
    })
  }, [teamAnswer, question, reset])

  const onSubmit = handleSubmit((data) => {
    changeTeamAnswer(
      teamAnswer?.teamId ?? 0,
      teamAnswer?.answer?.question_id ?? 0,
      data.answer ? data.answer : '',
      data.weight ? data.weight : 0
    )
    onClose()
  })

  return (
    <Modal2 visible={visible} onClose={onClose}>
      <form onSubmit={onSubmit}>
        {gameStatus === 'active' && (
          <div className={styles.main_container}>
            <div className={styles.modal_title}>
              <Typography tag='p' variant='text_36_b' style={{ whiteSpace: 'nowrap' }}>
                Оцените ответ команды
              </Typography>
              <button onClick={onClose}>
                <ModalClose />
              </button>
            </div>
            <div className={styles.input_container}>
              <Typography tag='p' variant='text_20_r'>
                Введите ответ команды
              </Typography>
              <input
                {...register('answer')}
                id='answer'
                defaultValue={teamAnswer?.answer?.answer_team_answer}
                className={styles.form_input}
              />
            </div>
            <div className={styles.input_container}>
              <Typography tag='p' variant='text_20_r'>
                Введите количество баллов{' '}
              </Typography>
              <input
                {...register('weight')}
                id='weight'
                type='number'
                defaultValue={teamAnswer?.answer?.answer_score}
                max={question?.question_weight}
                className={styles.form_input}
              />
              <Typography variant='text_16_r' className='self-start'>
                Максимум: {question?.question_weight}
              </Typography>
            </div>
            <button type='submit' className={styles.save_btn}>
              Сохранить
            </button>
          </div>
        )}
        {gameStatus === 'finished' && (
          <div className={styles.main_container}>
            <div className={styles.modal_title}>
              <Typography tag='p' variant='text_36_b'>
                Ответ команды
              </Typography>
              <button onClick={onClose}>
                <ModalClose />
              </button>
            </div>
            <Typography tag='p' variant='text_20_b'>
              Вопрос:{' '}
              <span className='font-vela-regular'>
                {question?.question_description || 'Вопрос не задан'}
              </span>
            </Typography>
            <Typography tag='p' variant='text_20_b'>
              Ответ команды:{' '}
              <span className='font-vela-regular'>
                {teamAnswer?.answer?.answer_team_answer || 'Ответ не дан'}
              </span>
            </Typography>
            <Typography tag='p' variant='text_20_b'>
              Правильный ответ:{' '}
              <span className='font-vela-regular'>
                {question?.question_correct_answer || 'Ответ не задан'}
              </span>
            </Typography>
            <Typography tag='p' variant='text_20_b'>
              Баллы:{' '}
              <span className='font-vela-regular'>
                {teamAnswer?.answer?.answer_score || 'Оценка не выставлена'}
              </span>
            </Typography>
          </div>
        )}
      </form>
    </Modal2>
  )
}
