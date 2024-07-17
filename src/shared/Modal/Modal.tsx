import { forwardRef } from 'react'

import { classnames } from '@utils'

import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  className?: string
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, className }, ref) => {
  const stylesModalContent = classnames(styles.modal_content, className)

  return (
    <div className={styles.modal_backdrop}>
      <div className={stylesModalContent} ref={ref}>
        {children}
      </div>
    </div>
  )
})
