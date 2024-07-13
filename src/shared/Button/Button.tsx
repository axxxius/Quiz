import { ComponentProps, ReactNode } from 'react'

import { classnames } from '@utils'

import styles from './Button.module.css'

type Variant = 'primary' | 'primary_regular' | 'secondary' | 'secondary_regular'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  children: ReactNode
  className?: string
}

export const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => (
  <button
    type={props.type ? props.type : 'button'}
    className={classnames(styles.button, styles[variant], className)}
    {...props}
  >
    {children}
  </button>
)
