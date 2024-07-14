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
        <Input label='Email' />
        <Input label='Пароль' type='password' />
      </div>
    </div>
  )
}

export default Auth
