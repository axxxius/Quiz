import { Link } from 'react-router-dom'

import MegaphoneIcon from '@assets/icons/megaphone.svg?react'
import { Typography } from '@shared'
import { getDate } from '@utils'

import styles from './Card.module.css'

interface CardProps {
  id: number
  game_name: string
  game_description: string
  game_date: string
  games_status: string
}

export const Card = ({ game_name, game_description, game_date, id }: CardProps) => {
  return (
    <Link to={`news/${id}`}>
      <div className={styles.container}>
        <div className={styles.date_container}>
          <MegaphoneIcon />
          <div className={styles.date_text}>
            <Typography className={styles.announcement} variant='text_32_b'>
              Анонс
            </Typography>
            <Typography className={styles.date} variant='text_32_b'>
              {getDate(game_date)}
            </Typography>
          </div>
        </div>
        <div className='px-[24px] py-[18px]'>
          <Typography variant='text_20_b'>{game_name}</Typography>
          <Typography variant='text_12_m'>{game_description}</Typography>
        </div>
      </div>
    </Link>
  )
}
