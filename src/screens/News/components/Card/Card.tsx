import { Typography } from '@shared'

import styles from './Card.module.css'

interface CardProps {
  title: string
  description: string
}

export const Card = ({ title, description }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className='mt-[240px] px-[24px]'>
        <Typography variant='text_16_b'>{title}</Typography>
        <Typography variant='text_12_m'>{description}</Typography>
      </div>
    </div>
  )
}
