import styles from '@screens/Teams/components/LoaderTeam/LoaderTeam.module.css'
import { Typography } from '@shared'

interface LoaderProps {
  isLoading?: boolean
}

export const LoaderTeam = ({ isLoading }: LoaderProps) => {
  return (
    <>
      {isLoading && (
        <div className={styles.container}>
          <Typography tag='h2' variant='text_16_b'>
            Загрузка
          </Typography>
          <span className={styles.loader}></span>
        </div>
      )}
    </>
  )
}
