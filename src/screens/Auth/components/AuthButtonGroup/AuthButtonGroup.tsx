import { Link } from 'react-router-dom'

import { Button } from '@shared'

import styles from '../../Auth.module.css'

interface ButtonGroupProps {
  isLogin: boolean
}

export const AuthButtonGroup = ({ isLogin }: ButtonGroupProps) => (
  <div className={styles.button_container}>
    {isLogin ? (
      <Link to='/register'>
        <Button type='button' variant='secondary_regular'>
          Зарегистрироваться
        </Button>
      </Link>
    ) : (
      <Link to='/login'>
        <Button type='button' variant='secondary_regular'>
          Войти
        </Button>
      </Link>
    )}
    <Button type='submit' variant='primary_regular'>
      {isLogin ? 'Войти' : 'Зарегистрироваться'}
    </Button>
  </div>
)
