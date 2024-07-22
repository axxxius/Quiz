import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { URLS } from '@navigation'
import { authAtom } from '@screens/Auth/Auth.atom.ts'
import { AuthButtonGroup } from '@screens/Auth/components'
import { schema } from '@screens/Auth/constants'
import { Input, Loader, Typography } from '@shared'
import { usePostLoginMutation } from '@utils'

import styles from '../../Auth.module.css'

export interface LoginFormValues {
  email: string
  password: string
}

export const LoginForm = () => {
  const navigate = useNavigate()
  const setAuthState = useSetRecoilState(authAtom)
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({ mode: 'onSubmit' })

  const loginForm = usePostLoginMutation({
    options: {
      onSuccess: (response) => {
        localStorage.setItem('access_token', response.data.access_token)
        setAuthState(response.data)
        navigate(URLS.NEWS)
      }
    }
  })

  const { errors, isSubmitting } = formState
  const loading = isSubmitting || loginForm.isPending
  if (loading) return <Loader />

  return (
    <div className={styles.page}>
      <Typography className={styles.header} variant='text_36_b'>
        Авторизация
      </Typography>
      <form
        className={styles.container}
        onSubmit={handleSubmit(async (formValues) => {
          loginForm.mutate({
            params: formValues
          })
        })}
      >
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
        <AuthButtonGroup isLogin={true} />
      </form>
    </div>
  )
}
