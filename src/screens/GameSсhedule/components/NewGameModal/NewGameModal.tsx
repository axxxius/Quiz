import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import ModalCross from '@assets/icons/modalCross.svg?react'
import { FirstForm, SecondForm } from '@screens/GameSсhedule/components'
import { Modal2, Typography } from '@shared'
import { useQueryClient } from '@tanstack/react-query'
import { timeZone, usePostAddQuestionMutation, usePostGameMutation } from '@utils'

import styles from './NewGameModal.module.css'

interface NewGameModalProps {
  onClose: () => void
  visible: boolean
}

export const NewGameModal = ({ onClose, visible }: NewGameModalProps) => {
  const [isNextStep, setIsNextStep] = useState(false)

  const methods = useForm<GameForm>({
    mode: 'onChange'
  })

  const { addGame } = usePostGameMutation()
  const { mutate } = usePostAddQuestionMutation()
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<GameForm> = async (data) => {
    const dateTime = `${data.date}T${data.time}`
    const dateObj = new Date(dateTime)

    const timeZoneOffset = timeZone()
    // Форматируем дату в соответствии с требуемым форматом
    const formattedDate = dateObj.toISOString().split('.')[0] + timeZoneOffset

    const newGameData: Pick<
      GameInSchedule,
      'game_name' | 'game_date' | 'game_description' | 'game_status'
    > = {
      game_name: data.name,
      game_description: data.description,
      game_date: formattedDate,
      game_status: 'planned'
    }
    const newGameResponse = await addGame(newGameData)
    const newGameId = newGameResponse.data.id
    //вот тут нужен id новой игры
    mutate(
      {
        gameId: newGameId,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        question: questions.map(({ id, ...rest }) => rest)
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['games'] })
          queryClient.invalidateQueries({ queryKey: ['game', newGameId] })
        }
      }
    )
    onClose()
    methods.reset()
  }

  const [questions, setQuestions] = useState<Question[]>([])

  return (
    <FormProvider {...methods}>
      <Modal2 visible={visible} onClose={onClose}>
        <div className={styles.main_container}>
          <div className={styles.modal_title}>
            <Typography variant='text_32_b'>Создать игру</Typography>
            <button onClick={onClose} className={styles.close_btn}>
              <ModalCross />
            </button>
          </div>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {!isNextStep ? (
              <FirstForm goNext={() => setIsNextStep(true)} />
            ) : (
              <SecondForm
                questions={questions}
                setQuestions={setQuestions}
                goBack={() => setIsNextStep(false)}
                onSubmitGame={onSubmit}
              />
            )}
          </form>
        </div>
      </Modal2>
    </FormProvider>
  )
}
