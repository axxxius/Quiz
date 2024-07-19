import { SubmitHandler, useForm, useFormContext } from 'react-hook-form'

import TrashIcon from '@assets/icons/trash.svg?react'
import { Button, Input, Typography } from '@shared'

import { GameFormValues } from '../NewGameModal/NewGameModal'

import styles from './SecondForm.module.css'

interface SecondFormProps {
  goBack: () => void
  onSubmitGame: SubmitHandler<GameFormValues>
  questions: Question[]
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}

interface QuestionFormValues {
  name: string
  description: string
  correctAnswer: string
  weight: number
}

export const SecondForm = ({ goBack, onSubmitGame, questions, setQuestions }: SecondFormProps) => {
  const methods = useFormContext<GameFormValues>()
  const { register, handleSubmit, reset, formState } = useForm<QuestionFormValues>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<QuestionFormValues> = (data) => {
    const newQuestion: Question = {
      id: Date.now(),
      ...data
    }
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions, newQuestion]
      // Обновите состояние в useFormContext только после обновления состояния questions
      methods.setValue('questions', updatedQuestions)
      return updatedQuestions
    })
    reset()
  }

  const onClickCreateQuestion = () => {
    handleSubmit(onSubmit)() // Вызов onSubmit напрямую
  }

  const onCLick = () => {
    goBack()
  }

  const onDeleteQuestion = (id: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((question) => question.id !== id)
      methods.setValue('questions', updatedQuestions)
      return updatedQuestions
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.create_question}>
        <Typography variant='text_20_r'>Создать вопрос</Typography>
        <div className={styles.input_container}>
          <Input
            label='Название вопроса'
            {...register('name', { required: 'Это поле является обязательным!' })}
            isError={!!formState.errors.name}
            helperText={formState.errors.name?.message}
          />
          <Input
            label='Описание'
            {...register('description', {
              maxLength: {
                value: 100,
                message: 'Максимальная длинна - 100 символов!'
              },
              required: 'Это поле является обязательным!'
            })}
            isError={!!formState.errors.description}
            helperText={formState.errors.description?.message}
          />
          <Input
            label='Эталон ответа'
            {...register('correctAnswer', {
              required: 'Это поле является обязательным!',
              maxLength: {
                value: 100,
                message: 'Максимальная длинна - 100 символов!'
              }
            })}
            isError={!!formState.errors.correctAnswer}
            helperText={formState.errors.correctAnswer?.message}
          />
          <Input
            label='Баллы'
            type='number'
            {...register('weight', {
              required: 'Это поле является обязательным!',
              min: { value: 1, message: 'Минимальное значение - 1' }
            })}
            isError={!!formState.errors.weight}
            helperText={formState.errors.weight?.message}
          />
        </div>
        <Button
          className={styles.create_question_btn}
          variant='primary_regular'
          onClick={onClickCreateQuestion}
        >
          Создать вопрос
        </Button>
      </div>
      <div className={styles.question_list}>
        <Typography variant='text_20_r'>Список вопросов</Typography>
        <div className={styles.questions_container}>
          {questions.length > 0 ? (
            questions.map((question) => (
              <div className={styles.question_card}>
                <span className='font-vela-regular text-[12px]'>
                  {question.name}: {question.description}
                </span>
                <button
                  type='button'
                  className='hover:outline-1 hover:outline-white'
                  onClick={() => onDeleteQuestion(question.id)}
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          ) : (
            <Typography variant='text_16_r'>Нет созданных вопросов</Typography>
          )}
        </div>
      </div>
      <div className={styles.buttons_container}>
        <Button
          className={styles.back_btn}
          type='button'
          variant='secondary_regular'
          onClick={onCLick}
        >
          Назад
        </Button>
        <Button
          className={styles.create_btn}
          type='submit'
          variant='primary_regular'
          onClick={methods.handleSubmit(onSubmitGame)}
        >
          Создать
        </Button>
      </div>
    </div>
  )
}
