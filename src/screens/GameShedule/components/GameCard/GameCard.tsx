import { useNavigate } from 'react-router-dom'

import DeleteImage from '@assets/icons/deleteGame.svg?react'
import EditImage from '@assets/icons/editGame.svg?react'
import { Typography } from '@shared'

import styles from './GameCard.module.css'

interface GameCardProps {
  game: Game
  role: 'admin' | 'user'
}

const formatDate = (dateString: string) => {
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

const GameCard = ({ game, role }: GameCardProps) => {
  const initialDate = game.date?.split('T')[0]?.split('-').reverse().join(' ')
  const date = formatDate(initialDate)
  const time = game.date?.split('T')[1].split('+')[0].slice(0, 5)

  const navigate = useNavigate()

  const handleNavigate = () => {
    if ((role === 'admin' && game.status === 'active') || game.status === 'finished') {
      navigate(`/activegame/${game.id}`)
    } else {
      alert('Игра уже идет еще не началась!')
    }
  }

  return (
    <div
      className={[
        styles.card_container,
        game.status === 'finished' ? 'border-white' : 'border-lime-200'
      ].join(' ')}
      onClick={() => handleNavigate()}
    >
      <Typography
        variant='text_16_r'
        className={[
          styles.date_container,
          game.status === 'finished' ? 'bg-white' : 'bg-lime-200'
        ].join(' ')}
      >
        {date}
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
        {time}
      </Typography>
      <Typography variant='text_16_r' className={styles.name_container}>
        {game.name}
      </Typography>
      <Typography variant='text_16_r' className={styles.description_container}>
        {game.description}
      </Typography>
      {role === 'admin' && game.status !== 'finished' && (
        <div className={styles.btn_container}>
          <button className={styles.delete_btn} onClick={(e) => e.stopPropagation()}>
            <EditImage />
          </button>
          <button className={styles.edit_btn} onClick={(e) => e.stopPropagation()}>
            <DeleteImage />
          </button>
        </div>
      )}
    </div>
  )
}

export default GameCard
