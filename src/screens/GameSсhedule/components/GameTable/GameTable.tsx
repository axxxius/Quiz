import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GameCard, GameModal, QuestionModal } from '@screens/GameSсhedule/components'

import styles from './GameTable.module.css'

interface GameTableProps {
  games: GameInSchedule[]
  role: string
}

export const GameTable = memo(({ games, role }: GameTableProps) => {
  // Инициализация состояния modals с учетом идентификаторов игр
  const [modals, setModals] = useState(
    games.reduce(
      (acc, game) => {
        acc[game.id] = { gameInfo: false, gameQuestions: false }
        return acc
      },
      {} as Record<string, { gameInfo: boolean; gameQuestions: boolean }>
    )
  )

  const navigate = useNavigate()

  const handleClick = (gameStatus: 'active' | 'finished' | 'planned', gameId: number) => {
    if (gameStatus === 'finished') {
      navigate(`/activegame/${gameId}`)
    } else {
      setModals((prev) => ({
        ...prev,
        [gameId]: { ...prev[gameId], gameInfo: true }
      }))
    }
  }

  return (
    <div className={styles.container}>
      {games.map((game) => (
        <React.Fragment key={game.id}>
          <GameCard
            game={game}
            role={role}
            onClick={() => handleClick(game.game_status, game.id)}
          />
          <GameModal
            gameId={game.id}
            visible={modals[game.id]?.gameInfo || false}
            onClose={() =>
              setModals((prev) => ({
                ...prev,
                [game.id]: { ...prev[game.id], gameInfo: false }
              }))
            }
            role={role}
            goNext={() =>
              setModals((prev) => ({
                ...prev,
                [game.id]: { gameInfo: false, gameQuestions: true }
              }))
            }
          />
          <QuestionModal
            isVisible={modals[game.id]?.gameQuestions || false}
            onClose={() =>
              setModals((prev) => ({
                ...prev,
                [game.id]: { gameQuestions: false }
              }))
            }
            goBack={() =>
              setModals((prev) => ({
                ...prev,
                [game.id]: { gameInfo: true, gameQuestions: false }
              }))
            }
            gameId={game.id}
          />
        </React.Fragment>
      ))}
    </div>
  )
})
