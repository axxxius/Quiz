import { memo } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/icons/logo.svg'
import styles from './Header.module.css'

export const Header = memo(() => {
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

  return (
    <header className={styles.header_container}>
      <nav className={styles.nav_wrapper}>
        <Link to='/'>
          <img src={Logo} alt='logo' className={styles.header_img} />
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
