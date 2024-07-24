import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { authAtom } from '@screens/Auth/Auth.atom'
import { CreatingTeamFormValues } from '@screens/Teams'
import styles from '@screens/Teams/components/Forms/CreatingTeamForm/CreatingTeamForm.module.css'
import { Textarea } from '@screens/Teams/components/Textarea/Textarea'
import { nameSchema } from '@screens/Teams/const/schemas'
import { captainAtom } from '@screens/Teams/Teams.atom'
import { Button, Input } from '@shared'
import { usePostTeamMutation } from '@utils'

import { ErrorMessage } from '../../ErrorMessage/ErrorMessage'
import { teamsTableAtom } from '../../Table/Table.atom'

import { creatingTeamFormAtom } from './CreatingTeamForm.atom'

interface CreatingTeamFormProps {
  handleClose: () => void
}

export const CreatingTeamForm = ({ handleClose }: CreatingTeamFormProps) => {
  const [teamFormValues, setTeamFormValues] = useRecoilState(creatingTeamFormAtom)
  const resetForm = useResetRecoilState(creatingTeamFormAtom)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<CreatingTeamFormValues>({ mode: 'onSubmit', defaultValues: teamFormValues })
  const { mutateAsync, error } = usePostTeamMutation()
  const setTeams = useSetRecoilState(teamsTableAtom)
  const authState = useRecoilValue(authAtom)
  const setIsCaptain = useSetRecoilState(captainAtom)

  const onSubmit = async (values: CreatingTeamFormValues) => {
    const { data } = await mutateAsync({
      ...values,
      captain_id: authState.user.id
    })
    setTeams((prev) => ({
      teams: [...prev.teams, { ...data, team_place: prev.teams.length + 1 }]
    }))
    setIsCaptain('capitan')
    resetForm()
    handleClose()
  }

  const handleChange = () => {
    setTeamFormValues(getValues())
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <Input
        className={styles.input}
        isError={!!errors.team_name}
        helperText={errors.team_name?.message}
        label='Название'
        {...register('team_name', nameSchema)}
      />
      <Textarea
        isError={!!errors.team_desc}
        helperText={errors.team_desc?.message}
        label='Описание'
        {...register('team_desc')}
      />
      <ErrorMessage error={error} />
      <div className={styles.button_container}>
        <Button className={styles.button} type='submit'>
          Создать команду
        </Button>
      </div>
    </form>
  )
}
