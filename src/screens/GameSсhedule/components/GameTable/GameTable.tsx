import React, { memo, useState } from 'react'

import { GameCard, GameModal } from '@screens/GameSсhedule/components'

import { QuestionModal } from '../QuestionModal/QuestionModal'

import { useNavigate } from 'react-router-dom'
import styles from './GameTable.module.css'

interface GameTableProps {
  games: Game[]
  role: TRole
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
}

export const GameTable = memo(({ games, role, setGames }: GameTableProps) => {
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
            onClick={() => handleClick(game.status, game.id)}
            setGames={setGames}
          />
          <GameModal
            game={game}
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
            setGames={setGames}
          />
          <QuestionModal
            questions={game.questions}
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
            setGames={setGames}
            gameId={game.id}
          />
        </React.Fragment>
      ))}
    </div>
  )
})
