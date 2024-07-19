import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import ModalCross from '@assets/icons/modalCross.svg?react'
import { FirstForm, SecondForm } from '@screens/GameShedule/components'
import { Modal2, Typography } from '@shared'

import styles from './NewGameModal.module.css'

interface NewGameModalProps {
  onClose: () => void
  visible: boolean
}

export interface GameFormValues {
  name: string
  date: string
  time: string
  description: string
  createAnnouncement: boolean
  questions: Question[]
}

export const NewGameModal = ({ onClose, visible }: NewGameModalProps) => {
  const [isNextStep, setIsNextStep] = useState(false)

  const methods = useForm<GameFormValues>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<GameFormValues> = (data) => {
    console.log(data)
  }

  const [questions, setQuestions] = useState<Question[]>([])

  if (!visible) return null

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
