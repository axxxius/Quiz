import { Select } from '@screens/Auth/components'
import { GENDER, ROLE } from '@screens/Auth/const.ts'
import { Input, Typography } from '@shared'

import styles from './Auth.module.css'

const Auth = () => {
  return (
    <div className={styles.page}>
      <Typography className={styles.header} variant='text_36_b'>
        Регистрация
      </Typography>
      <div className={styles.container}>
        <Input label='Имя' />
        <Select name='test' options={ROLE} label='Роль' />
        <Input label='Email' />
        <Input label='Пароль' type='password' />
        <Input label='Подтвердите пароль' type='password' />
        <Select name='' options={GENDER} label='Пол' />
        <Input label='Введите название команды или присоеденитесь к ней, вставив ссылку' />
      </div>
    </div>
  )
}

export default Auth
