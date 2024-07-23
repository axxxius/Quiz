import { SubmitHandler, useForm } from 'react-hook-form'

import { dateSchema, descrGameSchema, requiredSchema } from '@screens/GameSсhedule/constants'
import { Button, Input, Modal2, Typography } from '@shared'
import { usePutGameMutation } from '@utils'

import { formatDate } from '../GameCard/GameCard'

import { useQueryClient } from '@tanstack/react-query'
import styles from './EditGameModal.module.css'

function formatGameDate(dateString: string) {
  const months: { [key: string]: string } = {
    Января: '01',
    Февраля: '02',
    Марта: '03',
    Апреля: '04',
    Мая: '05',
    Июня: '06',
    Июля: '07',
    Августа: '08',
    Сентября: '09',
    Октября: '10',
    Ноября: '11',
    Декабря: '12'
  }

  const parts = dateString.split(' ')
  const day = parts[0].padStart(2, '0')
  const month = months[parts[1]]
  const year = parts[2]

  return `${year}-${month}-${day}`
}

interface EditGameProps {
  visible: boolean
  onClose: () => void
  game: GameInSchedule
}

export const EditGameModal = ({ visible, onClose, game }: EditGameProps) => {
  const methods = useForm<StandartGameInSchedule>()

  const today = new Date().toISOString().split('T')[0]

  const initialDate = game.game_date.split('T')[0]?.split('-').reverse().join(' ')
  const date = formatDate(initialDate)
  const timeParts = game.game_date.split('T')[1]
  const time = timeParts ? timeParts.split('+')[0].slice(0, 5) : '00:00'

  const { mutate } = usePutGameMutation()
  const queryClient = useQueryClient()
  const onSubmit: SubmitHandler<StandartGameInSchedule> = (data) => {
    mutate({ game: data, gameId: game.id })
    queryClient.invalidateQueries({ queryKey: ['games'] })
    onClose()
  }

  return (
    <Modal2 visible={visible} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.general_info}>
          <Typography variant='text_32_b'>Общая информация</Typography>
          <div className={styles.input_container}>
            <div>
              <Input
                label='Название'
                defaultValue={game.game_name}
                {...methods.register('game_name', requiredSchema)}
                isError={!!methods.formState.errors.game_name}
                helperText={methods.formState.errors.game_name?.message}
              />
            </div>
            <div>
              <Input
                label='Описание'
                defaultValue={game.game_description}
                {...methods.register('game_description', descrGameSchema)}
                isError={!!methods.formState.errors.game_description}
                helperText={methods.formState.errors.game_description?.message}
              />
            </div>
          </div>
        </div>
        <div className={styles.date_and_time}>
          <Typography variant='text_20_r'>Дата и время</Typography>
          <div className={styles.input_container}>
            <div>
              <Input
                label='Дата'
                min={today}
                defaultValue={formatGameDate(date)}
                type='date'
                {...methods.register('game_date', dateSchema)}
                isError={!!methods.formState.errors.game_date}
                helperText={methods.formState.errors.game_date?.message}
              />
            </div>
            <div>
              <Input
                label='Время'
                type='time'
                defaultValue={time}
                {...methods.register('game_time', requiredSchema)}
                isError={!!methods.formState.errors.game_time}
                helperText={methods.formState.errors.game_time?.message}
              />
            </div>
          </div>
        </div>
        <Button
          className={styles.next_btn}
          type='submit'
          variant='primary_regular'
          onClick={methods.handleSubmit(onSubmit)}
        >
          Изменить
        </Button>
      </div>
    </Modal2>
  )
}
