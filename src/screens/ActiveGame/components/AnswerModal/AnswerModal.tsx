import { useEffect, useState } from 'react'
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
        answer: Omit<TeamAnswer, 'id'>
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

  const [modalQuestion, setModalQuestion] = useState<Question | undefined>(question)
  const [modalAnswer, setModalAnswer] = useState<Omit<TeamAnswer, 'id'> | undefined>(
    teamAnswer?.answer
  )

  useEffect(() => {
    setModalQuestion(question)
    setModalAnswer(teamAnswer?.answer)
  }, [teamAnswer, question, visible])

  useEffect(() => {
    reset({
      answer: modalAnswer?.answer_team_answer || '',
      weight: modalAnswer?.answer_score || question?.question_weight || 0
    })
  }, [teamAnswer, question, reset])

  const onSubmit = handleSubmit((data) => {
    changeTeamAnswer(
      modalAnswer?.team_id ?? 0,
      modalAnswer?.question_id ?? 0,
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
                defaultValue={modalAnswer?.answer_team_answer}
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
                step='0.01'
                defaultValue={modalAnswer?.answer_score}
                max={modalQuestion?.question_weight}
                className={styles.form_input}
              />
              <Typography variant='text_16_r' className='self-start'>
                Максимум: {modalQuestion?.question_weight}
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
                {modalQuestion?.question_description || 'Вопрос не задан'}
              </span>
            </Typography>
            <Typography tag='p' variant='text_20_b'>
              Ответ команды:{' '}
              <span className='font-vela-regular'>
                {modalAnswer?.answer_team_answer || 'Ответ не дан'}
              </span>
            </Typography>
            <Typography tag='p' variant='text_20_b'>
              Правильный ответ:{' '}
              <span className='font-vela-regular'>
                {modalQuestion?.question_correct_answer || 'Ответ не задан'}
              </span>
            </Typography>
            <Typography tag='p' variant='text_20_b'>
              Баллы:{' '}
              <span className='font-vela-regular'>
                {modalAnswer?.answer_score || 'Оценка не выставлена'}
              </span>
            </Typography>
          </div>
        )}
      </form>
    </Modal2>
  )
}
