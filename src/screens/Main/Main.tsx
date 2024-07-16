import { Link } from 'react-router-dom'

import { Button } from '@shared'

import styles from './Main.module.css'

const Main = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <Link to='/login'>
      <Button className={styles.but} variant='secondary'>
        Авторизация
      </Button>
    </Link>
  </div>
)

export default Main
