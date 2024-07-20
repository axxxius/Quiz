import { forwardRef } from 'react'

import styles from '@screens/Teams/components/Textarea/Textarea.module.css'
import { classnames } from '@utils'

interface TextareaProps {
  label: string,
  isError?: boolean,
  helperText?: string
}

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(({ label, isError = false, helperText, ...props }, ref) => {
  const stylesTextarea = classnames(styles.textarea, {
    [styles.textarea_error]: isError
  })
  return (
    <>
      <div ref={ref} className={styles.container}>
        <label className={styles.label}>{label}</label>
        <textarea className={stylesTextarea} rows={5} {...props} />
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  )
})
