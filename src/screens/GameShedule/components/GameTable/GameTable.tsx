import GameCard from '../GameCard/GameCard'

import styles from './GameTable.module.css'

interface GameTableProps {
  games: Game[]
  role: 'admin' | 'user'
}

const GameTable = ({ games, role }: GameTableProps) => {
  return (
    <div className={styles.container}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} role={role} />
      ))}
    </div>
  )
}

export default GameTable
