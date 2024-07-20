import { GameCard } from '@screens/GameShedule/components'

import styles from './GameTable.module.css'

interface GameTableProps {
  games: Game[]
  role: 'admin' | 'user'
}

export const GameTable = ({ games, role }: GameTableProps) => {
  return (
    <div className={styles.container}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} role={role} />
      ))}
    </div>
  )
}
