import { forwardRef, useRef, useState } from 'react'

import ArrowDown from '@assets/icons/arrow_down.svg?react'
import ArrowTop from '@assets/icons/arrow_top.svg?react'
import { useOnClickOutside } from '@hooks'
import { Input } from '@shared'

import styles from './Select.module.css'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  label?: string
  isError?: boolean
  helperText?: string
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ label, options, onChange, value, isError, helperText }, ref) => {
    const [display, setDisplay] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(containerRef, () => {
      setDisplay(false)
    })

    const handleToggleArrow = () => {
      setDisplay((prev) => !prev)
    }

    const handleOptionClick = (selectedValue: string) => {
      onChange(selectedValue)
      setDisplay(false)
    }

    return (
      <>
        <div className={styles.select_container} ref={containerRef}>
          <div className={styles.input_wrapper}>
            <Input
              onFocus={handleToggleArrow}
              className={styles.input}
              label={label}
              isError={isError}
              readOnly
              ref={ref}
              value={value ? options.find((option) => option.value === value)?.label : ''}
            />
            <button className={styles.arrowToggle} onClick={handleToggleArrow} type='button'>
              {display ? (
                <ArrowTop className={styles.arrow_toggle} />
              ) : (
                <ArrowDown className={styles.arrow_toggle} />
              )}
            </button>
          </div>
          {display && (
            <div className={styles.options_list}>
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={styles.option}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
      </>
    )
  }
)
