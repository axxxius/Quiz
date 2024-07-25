import { Link, useParams } from 'react-router-dom'

import { useRole } from '@hooks'
import { Button, Typography } from '@shared'
import { getDate, useGetGameQuery } from '@utils'

import styles from './NewsMore.module.css'

const NewsMore = () => {
  const { id } = useParams()
  const gameId = Number(id)

  const { gameData } = useGetGameQuery(gameId, true)
  const { role } = useRole()

  return (
    <div className={styles.container}>
      <Typography variant='text_36_b'>{gameData?.game_name}</Typography>
      <div className={styles.card}>
        <Typography variant='text_20_m'>Начало игры</Typography>
        <Typography variant='text_32_b'>{getDate(gameData?.game_date || '')}</Typography>
      </div>
      <Typography>{gameData?.game_description}</Typography>
      {role === 'leading' && (
        <Link to={`/activegame/${gameId}`}>
          <Button className={styles.button} variant='primary'>
            Перейти к игре
          </Button>
        </Link>
      )}
    </div>
  )
}

export default NewsMore
