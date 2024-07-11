import { Button, Input, Typography } from '@shared'
import { useNavigate } from 'react-router-dom'
import styles from './Main.module.css'

const Main = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Typography tag='h1' variant='text_24_b'>
        Анонсы и новости
      </Typography>
      <div style={{ width: '424px', margin: '0 auto' }}>
        <Input className='m-auto' label='Email' helperText='ghbdtn' />
      </div>
      <Button className={styles.but}>TEST</Button>
      {/* <Loader /> */}
      <div className='flex items-center justify-around'>
        <Button onClick={() => navigate('/activegame')}>Игра</Button>
        <Button>Рега</Button>
      </div>
    </div>
  )
}

export default Main
