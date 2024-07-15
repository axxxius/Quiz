import { ComponentProps, useState } from 'react'

import HideIcon from '@assets/icons/hide_password.svg?react'
import ShowIcon from '@assets/icons/show_passwod.svg?react'
import { classnames } from '@utils'

import styles from './Input.module.css'

interface InputProps extends Omit<ComponentProps<'input'>, 'placeholder'> {
  label?: string
  isError?: boolean
  helperText?: string
  className?: string
}

export const Input = ({
  label,
  type = 'text',
  isError = false,
  helperText,
  className,
  ...props
}: InputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const containerClasses = classnames(styles.container, className)
  const stylesInput = classnames(styles.input, {
    [styles.input_error]: isError
  })

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const inputType = type === 'password' && passwordVisible ? 'text' : type

  return (
    <>
      <div className={containerClasses}>
        <label className={styles.label}>{label}</label>
        <div className={styles.input_wrapper}>
          <input className={stylesInput} type={inputType} {...props} />
          {type === 'password' && (
            <button
              type='button'
              className={styles.password_toggle}
              onClick={handleTogglePasswordVisibility}
            >
              {passwordVisible ? <HideIcon /> : <ShowIcon />}
            </button>
          )}
        </div>
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  )
}
