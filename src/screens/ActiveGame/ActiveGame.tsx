import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AnswerModal, AnswersList, GameInfo, TeamList } from '@screens/ActiveGame/components'
import { initialGame } from '@screens/GameSсhedule/components'
import { Typography } from '@shared'
import { useQueryClient } from '@tanstack/react-query'
import { useGetAnswerQuery, useGetGameQuery, usePostAnswersMutation } from '@utils'

import styles from './ActiveGame.module.css'

const initialTeam: TeamInGame[] = [
  {
    team_id: 0,
    team_name: 'team Name'
  }
]

export interface TeamScore {
  scores: {
    [key: number]: number
  }
}

export const initialAnswer: TeamAnswer[] = [
  {
    id: 0,
    answer_team_answer: '',
    answer_is_correct: false,
    answer_score: 0,
    game_id: 0,
    team_id: 0,
    question_id: 0
  }
]

const initialScore: TeamScore = {
  scores: {
    5: 0
  }
}

const ActiveGame = () => {
  const params = useParams()
  const gameId = params.id

  const gameIdNumber = gameId ? parseInt(gameId, 10) : 0

  const { gameData } = useGetGameQuery(gameIdNumber, !!gameId)

  const [game, setGame] = useState<Game>(initialGame)
  const [teamList, setTeamList] = useState<TeamInGame[]>(initialTeam)

  useEffect(() => {
    if (gameData !== undefined) {
      setGame(gameData)
      if (gameData.game_teams !== undefined) {
        setTeamList(gameData.game_teams)
        if (game.game_status === 'planned') {
          addAnswer({
            answer: {
              answer_team_answer: '',
              answer_is_correct: false,
              answer_score: 0,
              game_id: gameIdNumber,
              question_id: gameData.game_questions[0].id,
              team_id: gameData.game_teams[0].team_id
            },
            gameId: game.id
          })
        }
      }
    }
  }, [gameData])

  const { data } = useGetAnswerQuery(gameIdNumber)

  const [answers, setAnswers] = useState<TeamAnswer[]>(initialAnswer)
  const [score, setScore] = useState<TeamScore>(initialScore)
  useEffect(() => {
    if (data !== undefined) {
      if (data.length === 1) {
        setScore(data[0])
      } else if (data.length >= 2) {
        setAnswers(data.slice(0, data.length - 1))
        setScore(data[data.length - 1])
      }
    }
  }, [data])
  const completeGame = () => {
    if (game.game_status === 'active') {
      addAnswer({
        answer: {
          answer_team_answer: '',
          answer_is_correct: false,
          answer_score: 0,
          game_id: game.id,
          question_id: game.game_questions[0].id,
          team_id: teamList[0].team_id,
          status: 'finished'
        },
        gameId: game.id
      })
    }
  }

  const { addAnswer, isPending } = usePostAnswersMutation()

  const queryClient = useQueryClient()
  const changeTeamAnswer = (
    teamId: number,
    questionId: number,
    newAnswer: string,
    weight: number | undefined
  ) => {
    addAnswer(
      {
        gameId: game.id,
        answer: {
          game_id: game.id,
          team_id: teamId,
          question_id: questionId,
          answer_team_answer: newAnswer,
          answer_score: weight || 0,
          answer_is_correct: !!(newAnswer || weight)
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['get-answers', game.id] })
        }
      }
    )
  }

  const [openModal, setOpenModal] = useState(false)
  const [currentValues, setCurrentValues] = useState<{
    teamId: number
    answer: Omit<TeamAnswer, 'id'>
    question: Question
  }>()

  return (
    <>
      <div className={styles.container}>
        <GameInfo game={game} changeGameStatus={completeGame} />
        <div className={styles.game_container}>
          <Typography tag='p' variant='text_24_b'>
            Игра
          </Typography>
          <div className={styles.table_container}>
            <TeamList teamList={teamList} teamScore={score} />
            <AnswersList
              gameId={game.id}
              answers={answers}
              teamList={teamList}
              isPending={isPending}
              questions={game.game_questions}
              gameStatus={game.game_status}
              changeTeamAnswer={changeTeamAnswer}
              setOpenModal={setOpenModal}
              setCurrentValues={setCurrentValues}
            />
          </div>
        </div>
      </div>
      <AnswerModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        teamAnswer={currentValues}
        question={game.game_questions.find(
          (question) => currentValues?.answer?.question_id === question.id
        )}
        changeTeamAnswer={changeTeamAnswer}
        gameStatus={game.game_status}
      />
    </>
  )
}

export default ActiveGame
