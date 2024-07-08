import { Input, Loader, Typography } from '@shared'

import { Header } from '../../shared/Header/Header'

const Main = () => (
  <div>
    <Header />
    <Typography tag='h1' variant='text_24_b'>
      Анонсы и новости
    </Typography>
    <div style={{ width: '424px', margin: '0 auto' }}>
      <Input className='m-auto' label='Email' helperText='ghbdtn' />
    </div>
    <Loader />
  </div>
)

export default Main
