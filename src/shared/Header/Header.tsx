import { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import Logo from '@assets/icons/logo.svg?react'
import { authAtom } from '@screens/Auth/Auth.atom.ts'
import { Button } from '@shared'
import styles from '@shared/Header/Header.module.css'

import { usePostLogoutMutation } from '../../utils/api/hooks/auth/usePostLogoutMutation.ts'

const navList = [
  {
    name: 'Анонсы и новости',
    path: '/'
  },
  {
    name: 'Рейтинг команд',
    path: '/teams'
  },
  {
    name: 'Расписание игр',
    path: '/gameshedule'
  }
]

export const Header = memo(() => {
  const [isAuth, setIsAuth] = useState(true) //закинуть в менеджер состояний
  const [isRegisterPage] = useState(false) //и это тоже
  const authState = useRecoilValue(authAtom)

  const navigate = useNavigate()

  const { mutate: logout } = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        navigate('/login')
        localStorage.removeItem('access_token')
      }
    }
  })

  const onClick = () => {
    logout(undefined!)
    setIsAuth(false)
  }

  return (
    <header className={styles.header_container}>
      <nav className={styles.nav_wrapper}>
        <Link to='/'>
          <Logo className={styles.header_img} />
        </Link>
        <ul className={styles.nav_list}>
          {navList.map((link) => (
            <li key={link.name} className={styles.nav_li}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        {!isAuth && !isRegisterPage && (
          <div className={styles.buttons_container}>
            <Link to='/register'>
              <Button variant='primary_regular'>Зарегистрироваться</Button>
            </Link>
            <Link to='/login'>
              <Button variant='secondary_regular' onClick={() => setIsAuth(true)}>
                Войти
              </Button>
            </Link>
          </div>
        )}
        {isAuth && (
          <div className={styles.user_container}>
            <div className={styles.user_name}>{authState.user.username}</div>
            <Link to='/login'>
              <Button variant='secondary_regular' onClick={onClick}>
                Выйти
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
})
