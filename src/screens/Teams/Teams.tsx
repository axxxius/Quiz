import { Search } from '@screens/Teams/components';

import styles from './Teams.module.css'

const Teams = () => (
    <div>
        <h1 className={styles.page_name}>Рейтинг команд</h1>
        <div className={styles.main}>

            <Search />
        </div>
    </div>
)

export default Teams;