import { forwardRef } from 'react'

import { ErrorMessage, LoaderTeam } from '@screens/Teams/components'
import { classnames } from '@utils'

import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  className?: string
  isError?: boolean
  isLoading?: boolean
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, className, isError, isLoading }, ref) => {
    const stylesModalContent = classnames(styles.modal_content, className)

    return (
      <div className={styles.modal_backdrop}>
        <div className={stylesModalContent} ref={ref}>
          {children}
          <ErrorMessage isError={isError} />
          <LoaderTeam isLoading={isLoading} />
        </div>
      </div>
    )
  }
)
