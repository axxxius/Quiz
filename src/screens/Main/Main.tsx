import { Input, Loader } from '../../shared'
import { Header } from '../../shared/Header/Header'

const Main = () => (
  <div>
    <Header />
    <div style={{ width: '424px', margin: '0 auto' }}>
      <Input className='m-auto' label='Email' helperText='ghbdtn' />
    </div>
    <Loader />
  </div>
)

export default Main
