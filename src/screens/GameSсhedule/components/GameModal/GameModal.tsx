import CrossIcon from '@assets/icons/modalCross.svg?react'
import TrashIcon from '@assets/icons/trash.svg?react'
import { Button, Modal2, Typography } from '@shared'

import { useNavigate } from 'react-router-dom'
import { formatDate } from '../GameCard/GameCard'
import styles from './GameModal.module.css'

interface GameModalProps {
  game: Game
  visible: boolean
  onClose: () => void
  goNext: () => void
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
  role: TRole
}

export const GameModal = ({ game, visible, onClose, goNext, setGames, role }: GameModalProps) => {
  const initialDate = game.date?.split('T')[0]?.split('-').reverse().join(' ')
  const time = game.date?.split('T')[1].split('+')[0].slice(0, 5)

  const deleteTeam = (teamId: number) => {
    const newTeams = game.teams?.filter((team) => team.id !== teamId) ?? []
    setGames((prev) =>
      prev.map((g) => {
        if (g.id === game.id) {
          return { ...g, teams: newTeams }
        }
        return g
      })
    )
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
            {game.name}
          </Typography>
          <button onClick={onClose}>
            <CrossIcon />
          </button>
        </div>
        <div className={styles.cards_container}>
          <div className={styles.green_card}>
            <Typography variant='text_20_b'>Начало игры</Typography>
            <Typography variant='text_32_b'>
              {formatDate(initialDate).split(' ')[0]} {formatDate(initialDate).split(' ')[1]}
            </Typography>
            <Typography variant='text_20_b'>{time}</Typography>
          </div>
          <div className={styles.orange_card}>
            <Typography variant='text_20_b' className='max-w-[120px] whitespace-normal'>
              Количество вопросов
            </Typography>
            <Typography variant='text_36_b'>{game.questions.length}</Typography>
          </div>
        </div>
        <div className={styles.main_container}>
          <div className={styles.description_container}>
            <Typography variant='text_20_b'>Описание</Typography>
            <Typography
              variant='text_16_m'
              className='max-h-[88px] max-w-[450px] overflow-hidden text-ellipsis'
            >
              {game.description ? game.description : 'Нет описания'}
            </Typography>
          </div>
          <div className={styles.leading_container}>
            <Typography variant='text_20_b'>Ведущий</Typography>
            <Typography variant='text_16_m'>
              {game.leading ? game.leading : 'Ведущий не указан'}
            </Typography>
          </div>
          <div className={styles.teams_container}>
            <Typography variant='text_20_b'>Команды</Typography>
            <ul className={[styles.teams_list, 'min-w-[300px]'].join(' ')}>
              {(game?.teams?.length ?? 0 > 0) && game.teams ? (
                game.teams.map((team) => (
                  <div className={styles.team_card} key={team.id}>
                    <Typography variant='text_12_m'>{team.name}</Typography>
                    {role === 'admin' && (
                      <button onClick={() => deleteTeam(team.id)}>
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
        {role === 'admin' && game.status === 'planned' && (
          <Button className={styles.next_btn} variant='primary' onClick={goNext}>
            Далее
          </Button>
        )}
        {role === 'capitan' && game.status === 'planned' && (
          // <--- This is a bug (надо добавить проверку есть ли команда пользователя в игре)
          <Button className={styles.join_btn} variant='primary'>
            Вступить в игру
          </Button>
        )}
        {role === 'capitan' && game.status === 'planned' && (
          <Typography variant='text_16_b' className='ml-auto'>
            Вы&nbsp;уже состоите в&nbsp;этой игре
          </Typography>
        )}
        {role === 'admin' && game.status === 'active' && (
          <Button
            className='max-w-[200px] self-end whitespace-nowrap'
            variant='primary'
            onClick={() => continueGame(game.id)}
          >
            Продолжить игру
          </Button>
        )}
        {role === 'user' ||
          (role === 'capitan' && game.status === 'active' && (
            <Typography variant='text_20_b' className='self-end'>
              Игра уже началась
            </Typography>
          ))}
      </div>
    </Modal2>
  )
}
