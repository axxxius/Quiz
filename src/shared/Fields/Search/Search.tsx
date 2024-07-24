import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import styles from './Search.module.css'

interface SearchProps {
  setSearch?: Dispatch<SetStateAction<string>>
}

export const Search = ({ setSearch }: SearchProps) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (setSearch) setSearch(evt.target.value)
  }

  return (
    <div className={styles.input_container}>
      <input
        className={styles.input}
        type='seacrh'
        name='search_teams'
        placeholder='Поиск...'
        onChange={handleChange}
      />
    </div>
  )
}
