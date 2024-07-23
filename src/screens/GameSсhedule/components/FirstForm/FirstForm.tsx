import { Controller, useFormContext } from 'react-hook-form'

import CheckboxFalse from '@assets/icons/checkbox_false.svg?react'
import CheckboxTrue from '@assets/icons/checkbox_true.svg?react'
import { dateSchema, descrGameSchema, requiredSchema } from '@screens/GameSсhedule/constants'
import { Button, Input, Typography } from '@shared'

import styles from './FirstForm.module.css'

interface FirstFormProps {
  goNext: () => void
}

export const FirstForm = ({ goNext }: FirstFormProps) => {
  const methods = useFormContext<GameForm>()

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className={styles.container}>
      <div className={styles.general_info}>
        <Typography variant='text_20_r'>Общая информация</Typography>
        <div className={styles.input_container}>
          <div>
            <Input
              label='Название'
              {...methods.register('name', requiredSchema)}
              isError={!!methods.formState.errors.name}
              helperText={methods.formState.errors.name?.message}
            />
          </div>
          <div>
            <Input
              label='Описание'
              {...methods.register('description', descrGameSchema)}
              isError={!!methods.formState.errors.description}
              helperText={methods.formState.errors.description?.message}
            />
          </div>
        </div>
      </div>
      <div className={styles.date_and_time}>
        <Typography variant='text_20_r'>Дата и время</Typography>
        <div className={styles.input_container}>
          <div>
            <Input
              label='Дата'
              min={today}
              type='date'
              {...methods.register('date', dateSchema)}
              isError={!!methods.formState.errors.date}
              helperText={methods.formState.errors.date?.message}
            />
          </div>
          <div>
            <Input
              label='Время'
              type='time'
              {...methods.register('time', requiredSchema)}
              isError={!!methods.formState.errors.time}
              helperText={methods.formState.errors.time?.message}
            />
          </div>
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
      <Button
        className={styles.next_btn}
        type='submit'
        variant='primary_regular'
        onClick={methods.handleSubmit(goNext)}
      >
        Далее
      </Button>
    </div>
  )
}
