import { ComponentProps, ReactNode } from 'react'

import { classnames } from '@utils'

import styles from './Button.module.css'

interface Variants {
  primary: 'primary'
  primary_regular: 'primary_regular'
  secondary: 'secondary'
  secondary_small: 'secondary_small'
  lead: 'lead'
  player: 'player'
  start_game: 'start_game'
}

type Variant = keyof Variants

interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  children: ReactNode
  className?: string
}

export const Button = ({
  variant = 'secondary_small',
  children,
  className,
  ...props
}: ButtonProps) => (
  <button
    type={props.type ? props.type : 'button'}
    className={classnames(styles.button, styles[variant], className)}
    {...props}
  >
    {children}
  </button>
)
