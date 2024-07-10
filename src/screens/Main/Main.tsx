import { Button, Header, Input, Loader, Typography } from '@shared'

import styles from './Main.module.css'

const Main = () => (
  <div>
    <Header />
    <Typography tag='h1' variant='text_24_b'>
      Анонсы и новости
    </Typography>
    <div style={{ width: '424px', margin: '0 auto' }}>
      <Input className='m-auto' label='Email' helperText='ghbdtn' />
    </div>
    <Button className={styles.but}>TEST</Button>
    <Loader />
  </div>
)

export default Main
