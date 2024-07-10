import { ComponentProps } from 'react'

import { classnames } from '@utils'

import styles from './Input.module.css'

interface InputProps extends Omit<ComponentProps<'input'>, 'placeholder'> {
  label: string
  isError?: boolean
  helperText?: string
  className?: string
}

export const Input = ({ label, isError = false, helperText, className, ...props }: InputProps) => {
  const containerClasses = classnames(styles.container, className)
  const stylesInput = classnames(styles.input, {
    [styles.input_error]: isError
  })

  return (
    <>
      <div className={containerClasses}>
        <label className={styles.label}>{label}</label>
        <input className={stylesInput} {...props} />
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  )
}
