import { Card } from '@screens/News/components'

import { Game } from '../../../../utils/api/requests/news/scheduled-games'

import styles from './CardList.module.css'

interface CardListProps {
  news: Game[]
}

export const CardList = ({ news }: CardListProps) => {
  return (
    <div className={styles.container}>
      {news?.map((item, index) => (
        <Card
          key={index}
          id={item.id}
          game_date={item.game_date}
          game_description={item.game_description}
          game_name={item.game_name}
          games_status={item.game_status}
        />
      ))}
    </div>
  )
}
