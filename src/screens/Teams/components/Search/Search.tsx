import styles from '@screens/Teams/components/Search/Search.module.css'
import { classnames } from '@utils'

export const Search = () => {
    const isLead = false;
    const stylesInput = classnames(styles.input, {
        [styles.input_lead]: isLead
    })

    return (
        <div className={styles.container}>
            <input className={stylesInput} type="seacrh" name="search_teams" placeholder='Поиск...' />
        </div>
    )
}
