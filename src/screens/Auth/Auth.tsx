import { useLocation } from 'react-router-dom'

import { URLS } from '@navigation'
import { LoginForm, RegisterForm } from '@screens/Auth/components'

import styles from './Auth.module.css'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === URLS.AUTH.LOGIN

  return <div className={styles.page}>{isLogin ? <LoginForm /> : <RegisterForm />}</div>
}

export default Auth
