import { CardList } from '@screens/News/components/CardList/CardList.tsx'
import { Typography } from '@shared'
import { useGetScheduledGamesQuery } from '@utils'

import styles from './News.module.css'

const News = () => {
  const { data } = useGetScheduledGamesQuery()

  const news = data?.data ?? []

  return (
    <div className={styles.container}>
      <Typography className={styles.title} tag='h1' variant='text_36_b'>
        Анонсы игр
      </Typography>
      <CardList news={news} />
    </div>
  )
}

export default News
