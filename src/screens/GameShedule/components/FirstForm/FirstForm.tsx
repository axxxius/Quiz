import { Controller, useFormContext } from 'react-hook-form'

import CheckboxFalse from '@assets/icons/checkbox_false.svg?react'
import CheckboxTrue from '@assets/icons/checkbox_true.svg?react'
import { Button, Input, Typography } from '@shared'

import { GameFormValues } from '../NewGameModal/NewGameModal'

import styles from './FirstForm.module.css'

interface FirstFormProps {
  goNext: () => void
}

export const FirstForm = ({ goNext }: FirstFormProps) => {
  const methods = useFormContext<GameFormValues>()

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className={styles.container}>
      <div className={styles.general_info}>
        <Typography variant='text_20_r'>Общая информация</Typography>
        <div className={styles.input_container}>
          <Input
            label='Название'
            {...methods.register('name', {
              required: 'Обязательное поле!'
            })}
            isError={!!methods.formState.errors.name}
            helperText={methods.formState.errors.name?.message}
          />
          <Input
            label='Описание'
            {...methods.register('description', {
              maxLength: {
                value: 1000,
                message: 'Максимальная длинна - 1000 символов!'
              }
            })}
            isError={!!methods.formState.errors.description}
            helperText={methods.formState.errors.description?.message}
          />
        </div>
      </div>
      <div className={styles.date_and_time}>
        <Typography variant='text_20_r'>Дата и время</Typography>
        <div className={styles.input_container}>
          <Input
            label='Дата'
            min={today}
            type='date'
            {...methods.register('date', {
              min: {
                value: today,
                message: 'Дата не может быть раньше текущей!'
              }
            })}
          />
          <Input label='Время' type='time' {...methods.register('time')} />
        </div>
      </div>
      <Controller
        control={methods.control}
        name='createAnnouncement'
        render={({ field }) => (
          <button
            type='button'
            className={styles.checkbox_btn}
            onClick={() => field.onChange(!field.value)}
          >
            {field.value ? <CheckboxTrue /> : <CheckboxFalse />}
            <Typography variant='text_16_r'>Создать анонс</Typography>
          </button>
        )}
      />
      <Button className={styles.next_btn} type='button' variant='primary_regular' onClick={goNext}>
        Далее
      </Button>
    </div>
  )
}
