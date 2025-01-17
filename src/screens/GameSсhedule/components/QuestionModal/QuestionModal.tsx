import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CrossIcon from '@assets/icons/modalCross.svg?react'
import { initialGame, QuestionsForm } from '@screens/GameSсhedule/components'
import { Button, Modal2, Typography } from '@shared'
import { useQueryClient } from '@tanstack/react-query'
import {
  useDeleteQuestionMutation,
  useGetGameQuery,
  usePostAddQuestionMutation,
  usePostAnswersMutation
} from '@utils'

import { initialTeam } from '@screens/ActiveGame/ActiveGame'
import styles from './QuestionModal.module.css'

const initialQuestion: Question[] = [
  {
    id: 1,
    question_name: '1.1',
    question_description: 'Что за вопросы?',
    question_correct_answer: 'а вот, нехер пиздеть',
    question_weight: 10
  }
]

interface QuestionModalProps {
  gameId: number
  isVisible: boolean
  onClose: () => void
  goBack: () => void
}

export const QuestionModal = ({ gameId, isVisible, onClose, goBack }: QuestionModalProps) => {
  const { gameData } = useGetGameQuery(gameId, isVisible)
  const [game, setGame] = useState(initialGame)
  const [teamList, setTeamList] = useState(initialTeam)
  const [questions, SetQuestions] = useState(initialQuestion)

  useEffect(() => {
    if (gameData !== undefined) {
      SetQuestions(gameData.game_questions)
      setGame(gameData)
      if (gameData.game_teams !== undefined) {
        setTeamList(gameData.game_teams)
      }
    }
  }, [gameData])

  const { mutate } = usePostAddQuestionMutation()
  const queryClient = useQueryClient()
  const onSubmit: SubmitHandler<QuestionForm> = async (data) => {
    const newQuestion: Omit<Question, 'id'>[] = [
      {
        question_name: data.name,
        question_description: data.description,
        question_correct_answer: data.correctAnswer,
        question_weight: data.weight
      }
    ]

    mutate(
      {
        gameId: gameId,
        question: newQuestion
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['games'] })
          queryClient.invalidateQueries({ queryKey: ['game', gameId] })
        }
      }
    )
  }

  const { deleteQuestion } = useDeleteQuestionMutation()
  const onDeleteQuestion = (id: number) => {
    deleteQuestion(
      {
        gameId: gameId,
        quesId: { ques_id: id }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['games'] })
          queryClient.invalidateQueries({ queryKey: ['game', gameId] })
        }
      }
    )
  }

  const navigate = useNavigate()
  const { addAnswer } = usePostAnswersMutation()

  const handleNavigate = () => {
    if ((gameData?.game_teams?.length ?? 0) < 1 || (questions?.length ?? 0) < 1) {
      alert('невозвожно начать игру без команд и вопросов!')
      return
    }
    onClose()
    navigate(`/activegame/${gameId}`)
    addAnswer(
      {
        answer: {
          answer_team_answer: '',
          answer_is_correct: false,
          answer_score: 0,
          game_id: game.id,
          question_id: game.game_questions[0].id,
          team_id: teamList?.[0].team_id
        },
        gameId: game.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['game', game.id] })
        }
      }
    )
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
