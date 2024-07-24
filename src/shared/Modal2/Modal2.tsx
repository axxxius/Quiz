import { CSSProperties, useEffect } from 'react'

import styles from './Modal2.module.css'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  visible: boolean
  style?: CSSProperties
  className?: string
}

export const Modal2 = ({ children, onClose, visible, style, className }: ModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!visible) return null

  // обязательно прописывать e.stopPropagation() в каждом дочернем элементе
  return (
    <div className={`${styles.modal_container} ${className || ''}`} style={style} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
