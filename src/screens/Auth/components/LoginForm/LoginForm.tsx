import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { emailSchema, passwordSchema } from '@screens/Auth/constants'
import { Button, Input, Typography } from '@shared'

import styles from '../../Auth.module.css'
import { api } from '../../../../utils/api/instance.ts'
import { useQuery } from '@tanstack/react-query'

interface LoginFormValues {
  email: string
  password: string
}

const teams = async () => await api.get('/teams')

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({ mode: 'onSubmit' })
  const { errors } = formState

  const { data } = useQuery({
    queryKey: ['teams'],
    queryFn: () => teams
  })

  console.log('@@@data', data)

  const onSubmit = (data: LoginFormValues) => {
    console.log('@@@Login', data)
  }

  return (
    <div className={styles.page}>
      <Typography className={styles.header} variant='text_36_b'>
        Авторизация
      </Typography>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Email'
          isError={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', emailSchema)}
        />
        <Input
          label='Пароль'
          type='password'
          isError={!!errors.password}
          helperText={errors.password?.message}
          {...register('password', passwordSchema)}
        />
        <div className={styles.button_container}>
          <Link to='/register'>
            <Button type='button' variant='secondary_regular'>
              Зарегистрироваться
            </Button>
          </Link>
          <Button type='submit' variant='primary_regular'>
            Войти
          </Button>
        </div>
      </form>
    </div>
  )
}
