import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import { Textarea } from '@screens/Teams'
import styles from '@screens/Teams/components/Forms/EditTeamForm/EditTeamForm.module.css'
import { editNameSchema } from '@screens/Teams/const'
import { Button, Input } from '@shared'
import { useEditTeamMutation } from '@utils'

import { ErrorMessage } from '../../ErrorMessage/ErrorMessage'
import { teamAtom } from '../../Modals/TeamModal/Team.atom'

interface EditTeamFormProps {
  setEdit?: () => void
  formValues?: EditTeamFormValues
}

export interface EditTeamFormValues {
  team_name: string
  team_desc: string
}

export const EditTeamForm = ({ setEdit, formValues }: EditTeamFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditTeamFormValues>({ mode: 'onSubmit', defaultValues: formValues })
  const [team, setTeam] = useRecoilState(teamAtom)
  const { mutateAsync, error } = useEditTeamMutation(team.team_id as number)

  const onSubmit = async (teamFormValues: EditTeamFormValues) => {
    const { data } = await mutateAsync({
      team_id: team.team_id as number,
      teamUpdateValue: teamFormValues
    })
    setTeam((prev) => ({ ...prev, team_name: data.team_name, team_desc: data.team_desc }))
    if (setEdit) setEdit()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={styles.input}
        isError={!!errors.team_name}
        helperText={errors.team_name?.message}
        label='Название'
        {...register('team_name', editNameSchema)}
      />
      <Textarea
        isError={!!errors.team_desc}
        helperText={errors.team_desc?.message}
        label='Описание'
        {...register('team_desc')}
      />
      <ErrorMessage error={error} />
      <div className={styles.button_container}>
        <Button
          className={styles.button}
          type='button'
          variant='secondary_regular'
          onClick={setEdit}
        >
          Назад
        </Button>
        <Button className={styles.button} type='submit'>
          Сохранить
        </Button>
      </div>
    </form>
  )
}
