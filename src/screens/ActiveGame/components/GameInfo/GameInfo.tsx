import { Button, Typography } from '@shared'

import styles from './GameInfo.module.css'

interface GameInfoProps {
  game: Game
  changeGameStatus: (newStatus: 'active' | 'finished' | 'planned') => void
}

export const GameInfo = ({ game, changeGameStatus }: GameInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <p className='mb-6 font-vela-bold text-4xl'>{game.game_name}</p>
        <Typography tag='p' variant='text_24_b' className='mb-2'>
          Описание
        </Typography>
        <Typography tag='p' variant='text_20_m' className={styles.game_description}>
          {game.game_description}
        </Typography>
      </div>
      <div
        className={styles.right_container}
        style={
          game.game_status === 'active' || game.game_status === 'planned'
            ? { flexDirection: 'column', rowGap: '20px' }
            : { flexDirection: 'row-reverse', columnGap: '34px', marginBottom: '76px' }
        }
      >
        <div className={styles.question_count}>
          <Typography tag='p' variant='text_20_b'>
            Количество вопросов
          </Typography>
          <Typography tag='p' variant='text_36_b' className='text-4xl'>
            {game.game_questions.length}
          </Typography>
        </div>
        {game.game_status === 'active' && (
          <Button variant='primary' onClick={() => changeGameStatus('finished')}>
            Завершить игру
          </Button>
        )}
        {game.game_status === 'finished' && (
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
