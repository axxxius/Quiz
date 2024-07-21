import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CrossIcon from '@assets/icons/modalCross.svg?react'
import { QuestionsForm } from '@screens/GameSсhedule/components'
import { Button, Modal2, Typography } from '@shared'

import styles from './QuestionModal.module.css'

interface QuestionModalProps {
  gameId: number
  isVisible: boolean
  onClose: () => void
  goBack: () => void
  questions: Question[]
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
}

export const QuestionModal = ({
  gameId,
  isVisible,
  onClose,
  goBack,
  questions,
  setGames
}: QuestionModalProps) => {
  const onSubmit: SubmitHandler<QuestionForm> = (data) => {
    const newQuestion: Question = {
      id: Date.now(),
      ...data
    }

    setGames((prev) =>
      prev.map((game) => {
        if (game.id === gameId) {
          return { ...game, questions: [...game.questions, newQuestion] }
        }
        return game
      })
    )
  }

  const onDeleteQuestion = (id: number) => {
    setGames((prev) =>
      prev.map((game) => {
        if (game.id === gameId) {
          return { ...game, questions: game.questions.filter((question) => question.id !== id) }
        }
        return game
      })
    )
  }

  const navigate = useNavigate()

  const handleNavigate = () => {
    setGames((prev) =>
      prev.map((game) => {
        if (game.id === 1) {
          return { ...game, status: 'active' }
        }
        return game
      })
    )
    onClose()
    navigate(`/activegame/${gameId}`)
  }

  return (
    <Modal2 visible={isVisible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.modal_title}>
          <Typography variant='text_32_b'>Вопросы к игре</Typography>
          <button onClick={onClose}>
            <CrossIcon />
          </button>
        </div>
        <QuestionsForm
          questions={questions}
          onSubmit={onSubmit}
          onDeleteQuestion={onDeleteQuestion}
        />
        <div className={styles.btn_container}>
          <Button variant='secondary' className='max-w-[100px]' onClick={goBack}>
            Назад
          </Button>
          <Button
            variant='primary'
            className='max-w-[150px] whitespace-nowrap'
            onClick={handleNavigate}
          >
            Начать игру
          </Button>
        </div>
      </div>
    </Modal2>
  )
}
