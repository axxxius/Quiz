import { useForm } from 'react-hook-form'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import { CreatingTeamFormValues } from '@screens/Teams'
import styles from '@screens/Teams/components/Forms/CreatingTeamForm/CreatingTeamForm.module.css'
import { Textarea } from '@screens/Teams/components/Textarea/Textarea'
import { descriptionSchema, nameSchema } from '@screens/Teams/const/schemas'
import { roleAtom } from '@screens/Teams/Teams.atom'
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
  const [role, setRole] = useRecoilState(roleAtom)

  const onSubmit = async (values: CreatingTeamFormValues) => {
    const { data } = await mutateAsync({
      ...values,
      captain_id: role.id
    })
    setTeams((prev) => [...prev, { ...data }])
    setRole((prev) => ({
      ...prev,
      isCaptain: true
    }))
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
        {...register('team_desc', descriptionSchema)}
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
