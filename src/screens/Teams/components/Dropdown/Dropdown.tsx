import { Dispatch, SetStateAction, useRef, useState } from 'react'

import styles from '@screens/Teams/components/Dropdown/Dropdown.module.css'
import { OptionSort } from '@screens/Teams/types'
import { classnames } from '@utils'

import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'

interface DropdownProps {
  options: OptionSort[]
  setSelectedValue?: Dispatch<SetStateAction<OptionSort>>
  selectedValue?: OptionSort
}

export const Dropdown = ({ options, setSelectedValue, selectedValue }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const stylesButton = classnames(styles.dropbtn, {
    [styles.dropbtn_open]: isOpen
  })

  const handleClickToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickSelectedSort = (sortItem: OptionSort) => {
    if (setSelectedValue) setSelectedValue(sortItem)
    setIsOpen(!isOpen)
  }

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  return (
    <>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button className={stylesButton} type='button' onClick={handleClickToggleDropdown}>
          {selectedValue?.label}
        </button>
        {isOpen && (
          <div className={styles.dropdown_content}>
            <ul>
              {options.map((option) => (
                <li
                  key={option.value}
                  className={styles.item}
                  onClick={() => handleClickSelectedSort(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
