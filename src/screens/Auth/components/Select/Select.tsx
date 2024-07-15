import { useRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import ArrowDown from '@assets/icons/arrow_down.svg?react'
import ArrowTop from '@assets/icons/arrow_top.svg?react'
import { Input } from '@shared'

import { useOnClickOutside } from '../../../../hooks/useOnClickOutside.ts'

import styles from './Select.module.css'

interface Options {
  [key: string]: string
}

interface SelectProps {
  options: Options
  register?: UseFormRegister<any>
  label?: string
  name: string
}

export const Select = ({ label, options, register, name }: SelectProps) => {
  const [display, setDisplay] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const ref = useRef(null)

  useOnClickOutside(ref, () => {
    setDisplay(false)
  })

  const handleToggleArrow = () => {
    setDisplay(!display)
  }

  const handleOptionClick = (value: string) => {
    setSelectedValue(value)
    setDisplay(false)
  }

  return (
    <div className={styles.selectContainer} ref={ref}>
      <div className={styles.inputWrapper}>
        <Input
          onFocus={handleToggleArrow}
          className={styles.input}
          label={label}
          readOnly
          value={selectedValue ? options[selectedValue] : ''}
          {...(register ? register(name) : {})}
        />
        <button className={styles.arrowToggle} onClick={handleToggleArrow}>
          {display ? (
            <ArrowTop className={styles.arrowToggleIcon} />
          ) : (
            <ArrowDown className={styles.arrowToggleIcon} />
          )}
        </button>
      </div>
      {display && (
        <div className={styles.optionsList}>
          {Object.entries(options).map(([key, value]) => (
            <div key={key} onClick={() => handleOptionClick(key)} className={styles.option}>
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
