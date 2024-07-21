import DeleteImage from '@assets/icons/deleteGame.svg?react'
import EditImage from '@assets/icons/editGame.svg?react'
import { Typography } from '@shared'

import styles from './GameCard.module.css'

interface GameCardProps {
  game: Game
  role: TRole
  onClick: () => void
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
}

export const formatDate = (dateString: string) => {
  const months: { [key: string]: string } = {
    '01': 'Января',
    '02': 'Февраля',
    '03': 'Марта',
    '04': 'Апреля',
    '05': 'Мая',
    '06': 'Июня',
    '07': 'Июля',
    '08': 'Августа',
    '09': 'Сентября',
    '10': 'Октября',
    '11': 'Ноября',
    '12': 'Декабря'
  }

  const [day, month, year] = dateString.split(' ')
  const formattedDay = parseInt(day, 10) // Удаляем ведущий ноль
  const formattedMonth = months[month] // Получаем название месяца из словаря

  return `${formattedDay} ${formattedMonth} ${year}`
}

export const GameCard = ({ game, role, onClick, setGames }: GameCardProps) => {
  const initialDate = game.date?.split('T')[0]?.split('-').reverse().join(' ')
  const date = formatDate(initialDate)
  const time = game.date?.split('T')[1].split('+')[0].slice(0, 5)

  const deleteGame = (gameId: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setGames((prev) => prev.filter((game) => game.id !== gameId))
  }

  return (
    <div
      className={[
        styles.card_container,
        game.status === 'finished' ? 'border-white' : 'border-lime-200'
      ].join(' ')}
      onClick={onClick}
    >
      <Typography
        variant='text_16_r'
        className={[
          styles.date_container,
          game.status === 'finished' ? 'bg-white' : 'bg-lime-200'
        ].join(' ')}
      >
        {date ? date : 'Без даты'}
      </Typography>
      <Typography
        variant='text_16_r'
        className={[
          styles.time_container,
          game.status === 'finished'
            ? 'border-white bg-white text-white'
            : 'border-lime-200 bg-lime-200 text-lime-200'
        ].join(' ')}
      >
        {time ? time : 'Без времени'}
      </Typography>
      <Typography variant='text_16_r' className={styles.name_container}>
        {game.name ? game.name : 'Без названия'}
      </Typography>
      <Typography variant='text_16_r' className={styles.description_container}>
        {game.description ? game.description : 'Без описания'}
      </Typography>
      {role === 'admin' && game.status !== 'finished' ? (
        <div className={[styles.btn_container, 'py-[19px]'].join(' ')}>
          <button className={styles.delete_btn} onClick={(e) => e.stopPropagation()}>
            <EditImage />
          </button>
          <button className={styles.edit_btn} onClick={(e) => deleteGame(game.id, e)}>
            <DeleteImage />
          </button>
        </div>
      ) : (
        <div className={[styles.btn_container, 'py-[35px]'].join(' ')} />
      )}
    </div>
  )
}
