import { forwardRef } from 'react'

import styles from '@screens/Teams/components/Textarea/Textarea.module.css'

interface TextareaProps {
  label: string
}

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(({ label, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.textarea} rows={5} {...props} />
    </div>
  )
})
