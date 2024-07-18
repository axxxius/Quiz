import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import styles from '@screens/Teams/components/TeamForm/TeamForm.module.css'
import { Textarea } from '@screens/Teams/components/Textarea/Textarea'
import { descriptionSchema, nameSchema } from '@screens/Teams/const/schemas'
import { usePostTeamMutation } from '@screens/Teams/utils/api/hooks'
import { Button, Input, Typography } from '@shared'

import { teamsTableAtom } from '../Table/Table.atom'

interface TeamFormValues {
  name: string
  description: string
}

interface TeamFormProps {
  handleClick: () => void
}

export const TeamForm = ({ handleClick }: TeamFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TeamFormValues>({ mode: 'onSubmit' })
  const { mutateAsync } = usePostTeamMutation()
  const setTeams = useSetRecoilState(teamsTableAtom)

  const onSubmit = async ({ name, description }: TeamFormValues) => {
    const { data } = await mutateAsync({
      team_name: name,
      team_desc: description,
      captain_id: 0
    })
    setTeams((prev) => [...prev, data])
    console.log('Форма отправилась', data)
    handleClick()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input className={styles.input} label='Название' {...register('name', nameSchema)} />
      <Textarea label='Описание' {...register('description', descriptionSchema)} />
      {errors.description && (
        <Typography variant='text_16_r' className=''>
          {errors.description.message}
        </Typography>
      )}
      {errors.name && <Typography variant='text_16_r'>{errors.name.message}</Typography>}
      <div className={styles.button_container}>
        <Button className={styles.button} type='submit'>
          Создать команду
        </Button>
      </div>
    </form>
  )
}
