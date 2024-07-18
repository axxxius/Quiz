import { useState } from 'react'
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form'

import TrashIcon from '@assets/icons/trash.svg?react'
import { Button, Input, Typography } from '@shared'

import { GameFormValues } from '../NewGameModal/NewGameModal'

import styles from './SecodStep.module.css'

interface SecodStepProps {
  goBack: () => void
}

interface QuestionFormValues {
  name: string
  description: string
  correctAnswer: string
  weight: number
}

export const SecondStep = ({ goBack }: SecodStepProps) => {
  const methods = useFormContext<GameFormValues>()
  const { register, handleSubmit } = useForm<QuestionFormValues>()
  const [questions, setQuestions] = useState<Question[]>([])

  const onSubmit: SubmitHandler<QuestionFormValues> = (data) => {
    const newQuestion: Question = {
      id: Date.now(),
      ...data
    }
    setQuestions([...questions, newQuestion])
    methods.setValue('questions', [...questions, newQuestion])
  }

  const onCLick = () => {
    goBack()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.create_question}>
        <Typography variant='text_20_r'>Создать вопрос</Typography>
        <div className={styles.input_container}>
          <Input label='Название вопроса' {...register('name')} />
          <Input label='Описание' {...register('description')} />
          <Input label='Эталон ответа' {...register('correctAnswer')} />
          <Input label='Баллы' {...register('weight')} />
        </div>
        <Button className={styles.create_question_btn} variant='primary_regular'>
          Создать вопрос
        </Button>
      </form>
      <div className={styles.question_list}>
        <Typography variant='text_20_r'>Список вопросов</Typography>
        <div className={styles.questions_container}>
          {questions?.map((question) => (
            <div>
              <span>
                {question.name}: {question.description}
              </span>
              <button>
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons_container}>
        <Button className={styles.back_btn} variant='primary_regular' onClick={onCLick}>
          Назад
        </Button>
      </div>
    </div>
  )
}
