import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CrossIcon from '@assets/icons/modalCross.svg?react'
import TrashIcon from '@assets/icons/trash.svg?react'
import { Button, Modal2, Typography } from '@shared'
import { addTimeOffset, timeZone, useGetGameQuery } from '@utils'

import { formatDate } from '../GameCard/GameCard'

import styles from './GameModal.module.css'

export const initialGame: Game = {
  id: 1,
  game_name: 'game_name',
  game_description: 'game_description',
  game_date: '2024-07-23T22:48:00+05:00',
  game_status: 'planned',
  game_creator: '',
  game_questions: [
    {
      id: 1,
      question_name: '1.1',
      question_description: 'question',
      question_correct_answer: 'answer',
      question_weight: 100
    }
  ]
}

interface GameModalProps {
  gameId: number
  visible: boolean
  onClose: () => void
  goNext: () => void
  role: TRole
}

export const GameModal = memo(({ gameId, visible, onClose, goNext, role }: GameModalProps) => {
  const [game, setGame] = useState<Game>(initialGame)

  const { data } = useGetGameQuery(gameId, visible)

  useEffect(() => {
    if (data !== undefined) {
      setGame(data)
    }
  }, [data])

  const initialDate = game.game_date.split('T')[0]?.split('-').reverse().join(' ')
  const date = formatDate(initialDate)
  const timeZoneOffset = timeZone()
  const timeParts = game.game_date.split('T')[1]
  const time = timeParts
    ? addTimeOffset(timeParts.split('+')[0].slice(0, 5), timeZoneOffset)
    : '00:00'
  const deleteTeam = (teamId: number) => {
    console.log('delete team', teamId)
  }

  const navigate = useNavigate()

  const continueGame = (gameId: number) => {
    navigate(`/activegame/${gameId}`)
    onClose()
  }

  return (
    <Modal2 visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.modal_title}>
          <Typography
            variant='text_32_b'
            className='max-h-[44px] max-w-[30vw] overflow-hidden text-ellipsis'
          >
            {game.game_name}
          </Typography>
          <button onClick={onClose}>
            <CrossIcon />
          </button>
        </div>
        <div className={styles.cards_container}>
          <div className={styles.green_card}>
            <Typography variant='text_20_b'>Начало игры</Typography>
            <Typography variant='text_32_b'>{date}</Typography>
            <Typography variant='text_20_b'>{time}</Typography>
          </div>
          <div className={styles.orange_card}>
            <Typography variant='text_20_b' className='max-w-[120px] whitespace-normal'>
              Количество вопросов
            </Typography>
            <Typography variant='text_36_b'>{game.game_questions.length}</Typography>
          </div>
        </div>
        <div className={styles.main_container}>
          <div className={styles.description_container}>
            <Typography variant='text_20_b'>Описание</Typography>
            <Typography variant='text_16_m' className='max-w-[450px] overflow-hidden text-ellipsis'>
              {game.game_description ? game.game_description : 'Нет описания'}
            </Typography>
          </div>
          <div className={styles.leading_container}>
            <Typography variant='text_20_b'>Ведущий</Typography>
            <Typography variant='text_16_m'>{'Ведущий не указан'}</Typography>
          </div>
          <div className={styles.teams_container}>
            <Typography variant='text_20_b'>Команды</Typography>
            <ul className={[styles.teams_list, 'min-w-[300px]'].join(' ')}>
              {(game?.game_teams?.length ?? 0 > 0) && game.game_teams ? (
                game.game_teams.map((team) => (
                  <div className={styles.team_card} key={team.team_id}>
                    <Typography variant='text_12_m'>{team.team_name}</Typography>
                    {role === 'admin' && (
                      <button onClick={() => deleteTeam(team.team_id)}>
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <Typography variant='text_20_b' className='self-center'>
                  Нет команд
                </Typography>
              )}
            </ul>
          </div>
        </div>
        {role === 'admin' && game.game_status === 'planned' && (
          <Button className={styles.next_btn} variant='primary' onClick={goNext}>
            Далее
          </Button>
        )}
        {role === 'capitan' && game.game_status === 'planned' && (
          // <--- This is a bug (надо добавить проверку есть ли команда пользователя в игре)
          <Button className={styles.join_btn} variant='primary'>
            Вступить в игру
          </Button>
        )}
        {role === 'capitan' && game.game_status === 'planned' && (
          <Typography variant='text_16_b' className='ml-auto'>
            Вы&nbsp;уже состоите в&nbsp;этой игре
          </Typography>
        )}
        {role === 'admin' && game.game_status === 'active' && (
          <Button
            className='max-w-[200px] self-end whitespace-nowrap'
            variant='primary'
            onClick={() => continueGame(game.id)}
          >
            Продолжить игру
          </Button>
        )}
        {role === 'user' ||
          (role === 'capitan' && game.game_status === 'active' && (
            <Typography variant='text_20_b' className='self-end'>
              Игра уже началась
            </Typography>
          ))}
      </div>
    </Modal2>
  )
})
