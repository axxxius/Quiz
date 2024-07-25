import { Link } from 'react-router-dom'

import { CardList } from '@screens/News/components/CardList/CardList.tsx'
import { Button, Loader, Typography } from '@shared'
import { useGetScheduledGamesQuery } from '@utils'

import styles from './News.module.css'

const News = () => {
  const { data, isPending } = useGetScheduledGamesQuery()

  const news = data?.data ?? []

  if (isPending) return <Loader />
  return (
    <>
      <div className={styles.container}>
        <div className='align-items-center flex justify-between'>
          <Typography className={styles.title} tag='h1' variant='text_36_b'>
            Анонсы игр
          </Typography>
          <Link to='/login'>
            <Button className={styles.button} variant='secondary_regular'>
              Выйти
            </Button>
          </Link>
        </div>
        <CardList news={news} />
      </div>
    </>
  )
}

export default News
