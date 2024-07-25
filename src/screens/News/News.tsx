import { CardList } from '@screens/News/components/CardList/CardList.tsx'
import { Typography } from '@shared'

import styles from './News.module.css'
import { useGetScheduledGamesQuery } from '@utils'

const News = () => {
  const { data } = useGetScheduledGamesQuery()

  const news = data?.data ?? []

  return (
    <div className={styles.container}>
      <Typography tag='h1' variant='text_36_b'>
        Анонсы игр
      </Typography>
      <CardList news={news} />
    </div>
  )
}

export default News
