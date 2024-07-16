import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Select } from '@screens/Auth/components'
import {
  emailSchema,
  genderSchema,
  nameSchema,
  passwordSchema,
  roleSchema
} from '@screens/Auth/constants'
import { GENDER, ROLE } from '@screens/Auth/constants/const.ts'
import { Button, Input, Typography } from '@shared'

import styles from '../../Auth.module.css'

interface RegisterFormValues {
  name: string
  role: string
  email: string
  password: string
  confirmedPassword: string
  gender: string
  link: string
}

export const RegisterForm = () => {
  const { control, register, handleSubmit, formState } = useForm<RegisterFormValues>({
    mode: 'onSubmit'
  })
  const { errors } = formState

  const onSubmit = (data: RegisterFormValues) => {
    console.log('@@@Register', data)
  }

  return (
    <div className={styles.page}>
      <Typography className={styles.header} variant='text_36_b'>
        Регистрация
      </Typography>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Имя'
          isError={!!errors.name}
          helperText={errors.name?.message}
          {...register('name', nameSchema)}
        />
        <Controller
          name='role'
          control={control}
          rules={roleSchema}
          render={({ field }) => (
            <Select
              options={ROLE}
              label='Роль'
              isError={!!errors.role}
              helperText={errors.role?.message}
              {...field}
            />
          )}
        />
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
        <Input
          label='Подтвердите пароль'
          type='password'
          isError={!!errors.confirmedPassword}
          helperText={errors.confirmedPassword?.message}
          {...register('confirmedPassword', passwordSchema)}
        />
        <Controller
          name='gender'
          control={control}
          rules={genderSchema}
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
        <Input label='Присоединитесь к команде, вставив ссылку' {...register('link')} />
        <div className={styles.button_container}>
          <Link to='/login'>
            <Button type='button' variant='secondary_regular'>
              Войти
            </Button>
          </Link>
          <Button type='submit' variant='primary_regular'>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
