import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { URLS } from '@navigation'
import { Select } from '@screens/Auth/components'
import { GENDER, ROLE, schema } from '@screens/Auth/constants'
import { Button, Input, Loader, Typography } from '@shared'
import { usePostRegisterMutation } from '@utils'

import styles from '../../Auth.module.css'

export interface RegisterFormValues {
  username: string
  role: string
  email: string
  password: string
  gender: string
}

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { control, register, handleSubmit, formState } = useForm<RegisterFormValues>({
    mode: 'onSubmit'
  })

  const registerForm = usePostRegisterMutation({
    options: {
      onSuccess: () => {
        navigate(URLS.AUTH.LOGIN)
      }
    }
  })

  const { errors, isSubmitting } = formState
  const loading = isSubmitting || registerForm.isPending
  if (loading) return <Loader />

  return (
    <div className={styles.page}>
      <Typography className={styles.header} variant='text_36_b'>
        Регистрация
      </Typography>
      <form
        className={styles.container}
        onSubmit={handleSubmit(async (formValues) =>
          registerForm.mutate({
            params: formValues
          })
        )}
      >
        <Input
          label='Имя'
          isError={!!errors.username}
          helperText={errors.username?.message}
          disabled={loading}
          {...register('username', schema.nameSchema)}
        />
        <Controller
          name='role'
          control={control}
          rules={schema.roleSchema}
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
          disabled={loading}
          {...register('email', schema.emailSchema)}
        />
        <Input
          label='Пароль'
          type='password'
          isError={!!errors.password}
          helperText={errors.password?.message}
          disabled={loading}
          {...register('password', schema.passwordSchema)}
        />
        <Controller
          name='gender'
          control={control}
          rules={schema.genderSchema}
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
        <Button style={{ marginTop: '20px' }} type='submit' variant='primary_regular'>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  )
}
