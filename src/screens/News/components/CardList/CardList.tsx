import { Card } from '@screens/News/components'

import styles from './CardList.module.css'

interface CardListProps {
  news: Card[]
}

export const CardList = ({ news }: CardListProps) => {
  return (
    <div className={styles.container}>
      {news.map((item, index) => (
        <Card key={index} title={item.title} description={item.description} />
      ))}
    </div>
  )
}