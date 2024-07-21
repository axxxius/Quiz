import styles from '@screens/Profile/Profile.module.css'
import { Button, Input, Typography } from '@shared'
import { Controller, useForm } from 'react-hook-form'
import { nameSchema } from './const'
import { GENDER } from '@screens/Auth/constants/const'
import { Select } from '@screens/Auth/components'
import { useState } from 'react'

interface ProfileValues {
  username: string
  gender: string
}

const mockValues = {
  username: 'test',
  gender: 'female'
}

const Profile = () => {
  const [values, setValues] = useState<ProfileValues>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<ProfileValues>({ mode: 'onSubmit', defaultValues: mockValues, values })

  const onSubmit = (data: ProfileValues) => {
    setValues(data)
  }

  const handleClickCancel = () => {
    reset()
  }

  return (
    <div>
      <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
        Профиль
      </Typography>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Имя'
            isError={!!errors.username}
            helperText={errors.username?.message}
            {...register('username', nameSchema)}
            className={styles.input}
          />
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Select
                options={GENDER}
                label='Пол'
                isError={!!errors.gender}
                helperText={errors.gender?.message}
                {...field}
              />
            )}
          />
          <div className={styles.info}>
            <Typography tag='p' variant='text_20_r'>
              {`Роль: ${`участник`}`}
            </Typography>
            <Typography tag='p' variant='text_20_r'>
              {`Почта: ${`test@test.ru`}`}
            </Typography>
          </div>
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              variant='secondary'
              type='button'
              onClick={handleClickCancel}
            >
              Отменить изменения
            </Button>
            <Button type='submit'>Сохранить</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
