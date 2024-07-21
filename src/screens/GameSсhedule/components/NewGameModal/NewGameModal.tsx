import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import ModalCross from '@assets/icons/modalCross.svg?react'
import { FirstForm, SecondForm } from '@screens/GameSсhedule/components'
import { Modal2, Typography } from '@shared'

import styles from './NewGameModal.module.css'

interface NewGameModalProps {
  onClose: () => void
  visible: boolean
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
}

export const NewGameModal = ({ onClose, visible, setGames }: NewGameModalProps) => {
  const [isNextStep, setIsNextStep] = useState(false)

  const methods = useForm<GameForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<GameForm> = (data) => {
    setGames((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: data.name,
        date: `${data.date}T${data.time}:00+03:00`,
        description: data.description,
        status: 'planned',
        questions: questions,
        teams: []
      }
    ])
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
