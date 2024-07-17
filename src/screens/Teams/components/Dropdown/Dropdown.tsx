import { useRef, useState } from "react"

import styles from '@screens/Teams/components/Dropdown/Dropdown.module.css'
import { Option } from '@screens/Teams/types'
import { classnames } from "@utils";

import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";

interface DropdownProps {
    options: Option[]
}

export const Dropdown = ({ options }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedValue, setSelectedValue] = useState(options[0].label);
    const [isOpen, setIsOpen] = useState(false);
    const handleClickToggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const handleClickSelectedSort = (sortItem: string) => {
        setSelectedValue(sortItem);
        setIsOpen(!isOpen);
    }
    const stylesButton = classnames(styles.dropbtn, {
        [styles.dropbtn_open]: isOpen
    })
    useOnClickOutside(dropdownRef, () => setIsOpen(false))
    return (
        <>
            <div className={styles.dropdown} ref={dropdownRef}>
                <button className={stylesButton} type="button" onClick={handleClickToggleDropdown}>{selectedValue}</button>
                {isOpen &&
                    <div className={styles.dropdown_content}>
                        <ul>
                            {options.map((option) => 
                                <li 
                                    key={option.value} 
                                    className={styles.item} 
                                    onClick={() => handleClickSelectedSort(option.label)}>
                                    {option.label}
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>
        </>
    )
}