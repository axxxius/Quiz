import { SubmitHandler, useForm } from 'react-hook-form'

import TrashIcon from '@assets/icons/trash.svg?react'
import {
  descrQuestionSchema,
  patternQuestionName,
  weightSchema
} from '@screens/GameSсhedule/constants'
import { Button, Input, Typography } from '@shared'

import { useEffect, useState } from 'react'
import styles from './QuestionsForm.module.css'

interface QuestionsFormProps {
  onSubmit: SubmitHandler<QuestionForm>
  questions: Question[]
  onDeleteQuestion: (id: number) => void
}

export const QuestionsForm = ({ onSubmit, questions, onDeleteQuestion }: QuestionsFormProps) => {
  const { register, handleSubmit, formState, setValue, getValues } = useForm<QuestionForm>({
    mode: 'onChange'
  })

  const onClickCreateQuestion = handleSubmit((data) => {
    onSubmit(data)
    setValue('name', '')
    setValue('description', '')
    setValue('weight', 1)
    if (getValues('correctAnswer') !== currentEtalon) {
      setValue('correctAnswer', '')
    }
  })

  const [currentEtalon, setCurrentEtalon] = useState('')

  useEffect(() => {
    setValue('correctAnswer', currentEtalon)
  }, [currentEtalon, setValue])

  return (
    <div className={styles.container}>
      <div className={styles.create_question}>
        <Typography variant='text_20_r'>Создать вопрос</Typography>
        <div className={styles.input_container}>
          <div title='Формат названия вопроса: 1.1'>
            <Input
              label='Название вопроса'
              {...register('name', patternQuestionName)}
              isError={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />
          </div>
          <div>
            <Input
              label='Описание'
              {...register('description', descrQuestionSchema)}
              isError={!!formState.errors.description}
              helperText={formState.errors.description?.message}
            />
          </div>
          <div>
            <Input
              label='Эталон ответа'
              defaultValue={currentEtalon}
              {...register('correctAnswer', descrQuestionSchema)}
              isError={!!formState.errors.correctAnswer}
              helperText={formState.errors.correctAnswer?.message}
            />
            <div>
              Выбрать готовое -&gt;{' '}
              <button
                className={styles.etalon_btns}
                type='button'
                onClick={() => setCurrentEtalon('Да')}
              >
                Да
              </button>
              /
              <button
                className={styles.etalon_btns}
                type='button'
                onClick={() => setCurrentEtalon('Нет')}
              >
                Нет
              </button>
            </div>
          </div>
          <div>
            <Input
              label='Баллы'
              type='number'
              defaultValue={1}
              {...register('weight', weightSchema)}
              isError={!!formState.errors.weight}
              helperText={formState.errors.weight?.message}
            />
          </div>
        </div>
        <Button
          className={styles.create_question_btn}
          variant='primary_regular'
          onClick={onClickCreateQuestion}
        >
          Создать вопрос
        </Button>
      </div>
      <div className={styles.questions_list}>
        <Typography variant='text_20_r'>Список вопросов</Typography>
        <div className={styles.questions_container}>
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id} className={styles.question_card}>
                <span className='font-vela-regular text-[12px]'>
                  {question.question_name}: {question.question_description}
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
    </div>
  )
}
