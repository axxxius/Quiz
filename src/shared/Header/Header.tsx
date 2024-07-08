import { memo } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/icons/logo.svg?react'

import styles from './Header.module.css'

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
      </nav>
    </header>
  )
})
