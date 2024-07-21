import { SubmitHandler, useForm } from 'react-hook-form'

import TrashIcon from '@assets/icons/trash.svg?react'
import { Button, Input, Typography } from '@shared'

import styles from './QuestionsForm.module.css'

interface QuestionsFormProps {
  onSubmit: SubmitHandler<QuestionForm>
  questions: Question[]
  onDeleteQuestion: (id: number) => void
}

export const QuestionsForm = ({ onSubmit, questions, onDeleteQuestion }: QuestionsFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<QuestionForm>({
    mode: 'onChange'
  })

  const onClickCreateQuestion = handleSubmit((data) => {
    onSubmit(data)
    reset()
  })

  return (
    <div className={styles.container}>
      <div className={styles.create_question}>
        <Typography variant='text_20_r'>Создать вопрос</Typography>
        <div className={styles.input_container}>
          <div title='Формат названия вопроса: 1.1'>
            <Input
              label='Название вопроса'
              {...register('name', { required: 'Это поле является обязательным!' })}
              isError={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
    </div>
  )
}
