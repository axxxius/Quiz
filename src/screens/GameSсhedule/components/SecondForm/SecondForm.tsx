import { SubmitHandler, useFormContext } from 'react-hook-form'

import { QuestionsForm } from '@screens/GameSсhedule/components'
import { Button } from '@shared'

import styles from './SecondForm.module.css'

interface SecondFormProps {
  goBack: () => void
  onSubmitGame: SubmitHandler<GameForm>
  questions: Question[]
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
}

export const SecondForm = ({ goBack, onSubmitGame, questions, setQuestions }: SecondFormProps) => {
  const methods = useFormContext<GameForm>()

  const onSubmit: SubmitHandler<QuestionForm> = (data) => {
    const newQuestion: Question = {
      id: Date.now(),
      ...data
    }
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions, newQuestion]
      // Обновите состояние в useFormContext только после обновления состояния questions
      methods.setValue('questions', updatedQuestions)
      return updatedQuestions
    })
  }

  const onCLick = () => {
    goBack()
  }

  const onDeleteQuestion = (id: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((question) => question.id !== id)
      methods.setValue('questions', updatedQuestions)
      return updatedQuestions
    })
  }

  return (
    <div className={styles.container}>
      <QuestionsForm
        onSubmit={onSubmit}
        questions={questions}
        onDeleteQuestion={onDeleteQuestion}
      />
      <div className={styles.buttons_container}>
        <Button
          className={styles.back_btn}
          type='button'
          variant='secondary_regular'
          onClick={onCLick}
        >
          Назад
        </Button>
        <Button
          className={styles.create_btn}
          type='submit'
          variant='primary_regular'
          onClick={methods.handleSubmit(onSubmitGame)}
        >
          Создать
        </Button>
      </div>
    </div>
  )
}
