import { Game } from '@screens/ActiveGame/ActiveGame'
import { Button, Typography } from '@shared'
import { memo } from 'react'
import styles from './GameInfo.module.css'

interface GameInfoProps {
  game: Game
  changeGameStatus: (newStatus: 'active' | 'finished' | 'planned') => void
}

const GameInfo = ({ game, changeGameStatus }: GameInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <p className='mb-6 font-vela-bold text-4xl'>{game.name}</p>
        <Typography tag='p' variant='text_24_b'>
          Описание
        </Typography>
        <Typography tag='p' variant='text_20_m' className={styles.game_description}>
          {game.description}
        </Typography>
      </div>
      <div
        className={styles.right_container}
        style={
          game.status === 'active'
            ? { flexDirection: 'column', rowGap: '20px' }
            : { flexDirection: 'row-reverse', columnGap: '34px', marginBottom: '76px' }
        }
      >
        <div className={styles.question_count}>
          <Typography tag='p' variant='text_20_b'>
            Количество вопросов
          </Typography>
          <Typography tag='p' variant='text_36_b' className='text-4xl'>
            {game.questions.length}
          </Typography>
        </div>
        {game.status === 'active' && (
          <Button variant='primary_regular' onClick={() => changeGameStatus('finished')}>
            Завершить игру
          </Button>
        )}
        {game.status === 'finished' && (
          <div className={styles.finished_container}>
            <Typography tag='p' variant='text_24_b'>
              Игра уже завершилась
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(GameInfo)
