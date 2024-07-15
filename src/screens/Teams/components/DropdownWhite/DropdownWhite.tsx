import { useRef, useState } from "react"
import styles from '@screens/Teams/components/DropdownWhite/DropdownWhite.module.css'
import { classnames } from "@utils";
import { useOnClickOutside } from "./../../../../hooks/useOnClickOutside";

const sortMenu = ['Очкам', 'Играм', 'Дате создания', 'Названию']

export const DropdownWhite = () => {
    const refDropdown = useRef(null);
    const [selectedSort, setSelectedSort] = useState('Очкам');
    const [isOpen, setIsOpen] = useState(false);
    const handleClickToggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const handleClickSelectedSort = (sortItem: string) => {
        setSelectedSort(sortItem);
        setIsOpen(!isOpen);
    }
    const stylesButton = classnames(styles.dropbtn, {
        [styles.dropbtn_open]: isOpen
    })
    useOnClickOutside(refDropdown, () => setIsOpen(false))
    return (
        <>
            <div className={styles.dropdown} ref={refDropdown}>
                <button className={stylesButton} type="button" onClick={handleClickToggleDropdown}>{selectedSort}</button>
                {isOpen &&
                    <div className={styles.dropdown_content}>
                        <ul>
                            {sortMenu.map((item) => <li key={item} className={styles.item} onClick={() => handleClickSelectedSort(item)}>{item}</li>)}
                        </ul>
                    </div>
                }
            </div>
        </>
    )
}