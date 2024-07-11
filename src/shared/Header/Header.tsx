import { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '@assets/icons/logo.svg?react'
import { Button } from '@shared'
import styles from '@shared/Header/Header.module.css'

const navList = [
  {
    name: 'Анонсы и новости',
    path: '/'
  },
  {
    name: 'Рейтинг команд',
    path: '/'
  },
  {
    name: 'Расписание игр',
    path: '/'
  }
]

export const Header = memo(() => {
  const [isAuth, setIsAuth] = useState(true) //закинуть в менеджер состояний
  const [isRegisterPage] = useState(false) // и это тоже

  const userInfo = {
    name: 'Вадим'
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
            <Button variant='secondary_small'>Зарегистрироваться</Button>
            <Button variant='secondary_small' onClic={() => setIsAuth(true)}>
              Войти
            </Button>
          </div>
        )}
        {isAuth && (
          <div className={styles.user_container}>
            <div className={styles.user_name}>{userInfo.name}</div>
            <Button variant='secondary_small' onClick={() => setIsAuth(false)}>
              Выйти
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
})
