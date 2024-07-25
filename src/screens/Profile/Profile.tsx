import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom'
import { GENDER } from '@screens/Auth/constants/const'
import styles from '@screens/Profile/Profile.module.css'
import { LoaderTeam, UserType } from '@screens/Teams'
import { Button, Input, Select, Typography } from '@shared'
import { useEditUserMutation, useGetUserQuery } from '@utils'

import { nameSchema } from './const'
import { userAtom } from './Profile.atom'

interface ProfileValues {
  username: string
  gender: string
}

const Profile = () => {
  const [user, setUser] = useRecoilState<UserType>(userAtom)
  const authState = useRecoilValue(authAtom)
  const [edit, setEdit] = useState(false)
  const { data, isLoading, isSuccess, isError } = useGetUserQuery('default', { gcTime: 5 })
  const { mutateAsync, isSuccess: isSuccessEdit } = useEditUserMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm<ProfileValues>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      gender: ''
    },
    values: {
      username: user.user_name,
      gender: GENDER.filter((gen) => gen.label === user.user_gender)[0]?.value
    }
  })

  const onSubmit = async (values: ProfileValues) => {
    const { data } = await mutateAsync({ user_name: values.username, user_gender: values.gender })
    setUser(data)
    setEdit(true)
  }

  const handleClickCancel = () => {
    reset()
  }

  const handleChangeSelect = (value: string) => {
    setValue('gender', value)
    handleFocus()
  }

  const handleFocus = () => {
    setEdit(false)
  }

  useEffect(() => {
    if (isSuccess) setUser(data.data)
  }, [isLoading, authState.user.id])

  return (
    <>
      <div className={styles.container}>
        <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
          Профиль
        </Typography>
        {isError && (
          <Typography tag='div' variant='text_24_r' className={styles.auth}>
            Авторизуйтесь, чтобы посмотреть профиль
          </Typography>
        )}
        {isLoading && <LoaderTeam isLoading={isLoading} />}
        {isSuccess && (
          <div className={styles.main}>
            {isSuccessEdit && edit && (
              <Typography tag='div' variant='text_16_r' className={styles.edit_success}>
                Данные успешно сохранены
              </Typography>
            )}
            <form className={styles.form} onFocus={handleFocus} onSubmit={handleSubmit(onSubmit)}>
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
                    onChange={handleChangeSelect}
                  />
                )}
              />
              <div className={styles.info}>
                <Typography tag='p' variant='text_20_r'>
                  Роль: {user.user_role.toLowerCase()}
                </Typography>
                <Typography tag='p' variant='text_20_r'>
                  Почта: {user.user_email}
                </Typography>
              </div>
              {user.user_teams.length !== 0 && (
                <div className={styles.teams_container}>
                  <Typography tag='p' variant='text_20_r'>
                    Команды:
                  </Typography>
                  <div className={styles.team_list}>
                    <ul>
                      {user.user_teams?.map((team) => <li key={team.team_id}>{team.team_name}</li>)}
                    </ul>
                  </div>
                </div>
              )}
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
        )}
      </div>
    </>
  )
}

export default Profile
