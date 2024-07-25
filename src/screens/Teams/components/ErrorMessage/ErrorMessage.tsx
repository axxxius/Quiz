import { AxiosError } from 'axios'

import { AxiosErrorData } from '@screens/Teams'
import styles from '@screens/Teams/components/ErrorMessage/ErrorMessage.module.css'
import { Typography } from '@shared'
import { classnames } from '@utils'

interface ErrorMessageProps {
  error?: AxiosError<AxiosErrorData, any> | null
  isError?: boolean
  className?: string
}

export const ErrorMessage = ({ error, isError, className }: ErrorMessageProps) => {
  const data = error?.response?.data as AxiosErrorData
  const stylesMessage = classnames(styles.message, className)
  return (
    <>
      {error && data && (
        <>
          {Object.keys(data).map((error) => (
            <Typography className={stylesMessage} key={error} variant='text_16_r'>
              {data[error]}
            </Typography>
          ))}
        </>
      )}
      {isError && (
        <Typography className={stylesMessage} variant='text_16_b'>
          Ошибка загрузки
        </Typography>
      )}
    </>
  )
}
