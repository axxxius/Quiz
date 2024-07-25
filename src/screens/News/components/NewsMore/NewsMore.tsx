import { useParams } from 'react-router-dom'

import { useRole } from '@hooks'
import { Button, Typography } from '@shared'
import { getDate, useGetGameQuery } from '@utils'

import styles from './NewsMore.module.css'

const NewsMore = () => {
  const { id } = useParams()
  const gameId = Number(id)

  const { data } = useGetGameQuery(gameId)
  const { role } = useRole()

  return (
    <div className={styles.container}>
      <Typography variant='text_36_b'>{data?.game_name}</Typography>
      <div className={styles.card}>
        <Typography variant='text_20_m'>Начало игры</Typography>
        <Typography variant='text_32_b'>{getDate(data?.game_date || '')}</Typography>
      </div>
      <Typography>{data?.game_description}</Typography>
      {role === 'leading' && (
        <Button className={styles.button} variant='primary'>
          Перейти к игре
        </Button>
      )}
    </div>
  )
}

export default NewsMore
