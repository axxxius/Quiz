import styles from '@screens/Teams/components/LoaderTeam/LoaderTeam.module.css'
import { Typography } from '@shared'
import { classnames } from '@utils'

interface LoaderProps {
  isLoading?: boolean,
  className?: string
}

export const LoaderTeam = ({ isLoading, className }: LoaderProps) => {
  const stylesLoader = classnames(styles.container, className)

  return (
    <>
      {isLoading && (
        <div className={stylesLoader}>
          <Typography tag='h2' variant='text_16_b'>
            Загрузка
          </Typography>
          <span className={styles.loader}></span>
        </div>
      )}
    </>
  )
}
