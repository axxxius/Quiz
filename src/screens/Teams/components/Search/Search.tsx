import styles from '@screens/Teams/components/Search/Search.module.css'
import { classnames } from '@utils'

interface SearchProps {
  isLead: boolean
}

export const Search = ({ isLead }: SearchProps) => {
  const stylesInput = classnames({
    [styles.input_lead]: isLead
  })

  return (
    <div className={stylesInput}>
      <input className={styles.input} type='seacrh' name='search_teams' placeholder='Поиск...' />
    </div>
  )
}
