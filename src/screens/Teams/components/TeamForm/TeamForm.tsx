import { useForm } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'

import styles from '@screens/Teams/components/TeamForm/TeamForm.module.css'
import { Textarea } from '@screens/Teams/components/Textarea/Textarea'
import { descriptionSchema, nameSchema } from '@screens/Teams/const/schemas'
import { TeamFormValues } from '@screens/Teams/types'
import { usePostTeamMutation } from '@screens/Teams/utils/api/hooks'
import { Button, Input, Typography } from '@shared'

import { teamsTableAtom } from '../Table/Table.atom'

import { teamFormAtom } from './TeamForm.atom'

interface TeamFormProps {
  handleClick: () => void
}

export const TeamForm = ({ handleClick }: TeamFormProps) => {
  const [teamFormValues, setTeamFormValues] = useRecoilState(teamFormAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<TeamFormValues>({ mode: 'onSubmit', defaultValues: teamFormValues })
  const { mutateAsync } = usePostTeamMutation()
  const setTeams = useSetRecoilState(teamsTableAtom)

  const onSubmit = async (values: TeamFormValues) => {
    const { data } = await mutateAsync({
      ...values,
      captain_id: 4
    })
    setTeams((prev) => [...prev, data])
    handleClick()
  }

  const handleChange = () => {
    setTeamFormValues(getValues())
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <Input className={styles.input} label='Название' {...register('team_name', nameSchema)} />
      <Textarea label='Описание' {...register('team_desc', descriptionSchema)} />
      {errors.team_desc && (
        <Typography variant='text_16_r' className=''>
          {errors.team_desc.message}
        </Typography>
      )}
      {errors.team_name && <Typography variant='text_16_r'>{errors.team_name.message}</Typography>}
      <div className={styles.button_container}>
        <Button className={styles.button} type='submit'>
          Создать команду
        </Button>
      </div>
    </form>
  )
}
