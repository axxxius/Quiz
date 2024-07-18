import { Controller, useFormContext } from 'react-hook-form'

import CheckboxFalse from '@assets/icons/checkbox_false.svg?react'
import CheckboxTrue from '@assets/icons/checkbox_true.svg?react'
import { Button, Input, Typography } from '@shared'

import styles from './FirstForm.module.css'

interface FirstFormProps {
  goNext: () => void
}

export const FirstForm = ({ goNext }: FirstFormProps) => {
  const methods = useFormContext()

  return (
    <div className={styles.container}>
      <div className={styles.general_info}>
        <Typography variant='text_20_r'>Общая информация</Typography>
        <div className={styles.input_container}>
          <Input label='Название' {...methods.register('name')} />
          <Input label='Описание' {...methods.register('description')} />
        </div>
      </div>
      <div className={styles.date_and_time}>
        <Typography variant='text_20_r'>Дата и время</Typography>
        <div className={styles.input_container}>
          <Input label='Дата' type='date' {...methods.register('date')} />
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
