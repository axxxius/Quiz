import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import Logo from '@assets/icons/logo.svg?react'
import { URLS } from '@navigation'
import { authAtom } from '@screens/Auth/Auth.atom.ts'
import { Button, Loader } from '@shared'
import styles from '@shared/Header/Header.module.css'
import { usePostLogoutMutation } from '@utils'

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
    path: '/gameschedule'
  }
]

export const Header = memo(() => {
  const [authState, setAuthState] = useRecoilState(authAtom)

  const navigate = useNavigate()
  const refreshToken = localStorage.getItem('refresh_token')

  const { mutate: logout, isPending } = usePostLogoutMutation({
    options: {
      onSuccess: () => {
        navigate(URLS.AUTH.LOGIN)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setAuthState({
          tokens: {
            access_token: '',
            refresh_token: ''
          },
          user: {
            id: 0,
            username: '',
            email: '',
            gender: '',
            description: ''
          }
        })
      }
    }
  })

  const onClick = () => {
    if (refreshToken) {
      logout({
        params: { refresh_token: refreshToken }
      })
    }
  }

  return (
    <>
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
          {!authState.user.username && (
            <div className={styles.buttons_container}>
              <Link to='/register'>
                <Button variant='primary_regular'>Зарегистрироваться</Button>
              </Link>
              <Link to='/login'>
                <Button variant='secondary_regular'>Войти</Button>
              </Link>
            </div>
          )}
          {authState.user.username && (
            <div className={styles.user_container}>
              <Link to='/profile'>
                <div className={styles.user_name}>{authState.user.username}</div>
              </Link>
              <Link to='/login'>
                <Button variant='secondary_regular' onClick={onClick}>
                  Выйти
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </header>
      {isPending && <Loader />}
    </>
  )
})
