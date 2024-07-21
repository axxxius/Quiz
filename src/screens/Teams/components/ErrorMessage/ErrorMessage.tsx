import { AxiosError } from 'axios'

import styles from '@screens/Teams/components/ErrorMessage/ErrorMessage.module.css'
import { Typography } from '@shared'
import { AxiosErrorData, classnames } from '@utils'

interface ErrorMessageProps {
  error?: AxiosError<AxiosErrorData, any> | null
  isError?: boolean
  className?: string
}

export const ErrorMessage = ({ error, isError, className }: ErrorMessageProps) => {
  const data = error?.response?.data
  const stylesMessage = classnames(styles.message, className)
  return (
    <>
      {error && data?.detail && (
        <Typography className={stylesMessage} variant='text_16_b'>
          {data.detail}
        </Typography>
      )}
      {isError && (
        <Typography className={stylesMessage} variant='text_16_b'>
          Ошибка загрузки
        </Typography>
      )}
    </>
  )
}
