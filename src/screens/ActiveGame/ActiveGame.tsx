import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AnswerModal, AnswersList, GameInfo, TeamList } from '@screens/ActiveGame/components'
import { initialGame } from '@screens/GameSсhedule/components'
import { Typography } from '@shared'
import { useGetGameQuery } from '@utils'

import styles from './ActiveGame.module.css'

const initialTeam: TeamInGame[] = [
  {
    team_id: 0,
    team_name: 'team Name'
  }
]

const ActiveGame = () => {
  const params = useParams()
  const gameId = params.id

  const gameIdNumber = gameId ? parseInt(gameId, 10) : 0

  const { data } = useGetGameQuery(gameIdNumber, !!gameId)

  const [game, setGame] = useState<Game>(initialGame)
  const [teamList, setTeamList] = useState<TeamInGame[]>(initialTeam)

  useEffect(() => {
    if (data !== undefined) {
      setGame(data)
      if (Array.isArray(data.game_teams)) setTeamList(data.game_teams)
    }
  }, [data])

  const changeGameStatus = () => {
    //изменение статуса при завершении игры
  }

  const changeTeamAnswer = () => {
    // setTeamList((prevTeamList) =>
    //   prevTeamList.map((team) => {
    //     if (team.id === teamId) {
    //       // Проверяем, есть ли уже ответ на этот вопрос
    //       const existingAnswerIndex = team.answers?.findIndex(
    //         (answer) => answer.questionId === questionId
    //       )
    //       if (existingAnswerIndex !== undefined && existingAnswerIndex >= 0) {
    //         // Если ответ существует, обновляем его
    //         const updatedAnswers = [...(team.answers ?? [])]
    //         updatedAnswers[existingAnswerIndex] = {
    //           ...updatedAnswers[existingAnswerIndex],
    //           answer: newAnswer,
    //           weight: weight ?? 0
    //         }
    //         return { ...team, answers: updatedAnswers }
    //       } else {
    //         // Если ответа нет, добавляем новый
    //         const newAnswerObj: TeamAnswer = {
    //           id: Math.random(),
    //           questionId,
    //           answer: newAnswer,
    //           weight: weight ?? 0
    //         } // Пример генерации ID
    //         return { ...team, answers: [...(team.answers ?? []), newAnswerObj] }
    //       }
    //     }
    //     return team
    //   })
    // )

    //изменить ответ команды
    console.log(teamList)
  }

  const [openModal, setOpenModal] = useState(false)
  const [currentValues, setCurrentValues] = useState<{ teamId: number; answer: TeamAnswer }>()

  return (
    <>
      <div className={styles.container}>
        <GameInfo game={game} changeGameStatus={changeGameStatus} />
        <div className={styles.game_container}>
          <Typography tag='p' variant='text_24_b'>
            Игра
          </Typography>
          <div className={styles.table_container}>
            <TeamList teamList={teamList} />
            <AnswersList
              gameId={game.id}
              teamList={teamList}
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
