import { forwardRef, useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import Close from '@assets/icons/close.svg?react'
import { EditTeamModal, NumericData } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/TeamModal/TeamModal.module.css'
import { roleAtom } from '@screens/Teams/Teams.atom'
import { FullTeam, Team } from '@screens/Teams/types'
import { Button, Modal, Typography } from '@shared'
import { useDeleteTeamMutation, useGetTeamQuery, useJoinTeamMutation } from '@utils'

import { teamsTableAtom } from '../../Table/Table.atom'
import { modalAtom, ShowModal } from '../Modal.atom'

import { teamAtom } from './Team.atom'

interface TeamModalProps {
  id: number
}

export const TeamModal = forwardRef<HTMLDivElement, TeamModalProps>(({ id }, ref) => {
  const { mutateAsync } = useDeleteTeamMutation(id)
  const [role, setRole] = useRecoilState(roleAtom)
  const { mutateAsync: mutateAsyncPatch } = useJoinTeamMutation(id)
  const [team, setTeam] = useRecoilState<FullTeam>(teamAtom)
  const [teams, setTeams] = useRecoilState<Team[]>(teamsTableAtom)
  const setShowModal = useSetRecoilState<ShowModal>(modalAtom)
  const [edit, setEdit] = useState(false)
  const { data, isLoading, isSuccess, isError } = useGetTeamQuery(id, team)

  const handleClickClose = () => {
    setShowModal((prev) => ({
      ...prev,
      showTeam: false
    }))
  }

  const handleClickDelete = async (id: number) => {
    await mutateAsync(id)
    setTeams(teams.filter((elem) => elem.team_id !== id))
    setRole((prev) => ({ ...prev, isCaptain: false }))
    handleClickClose()
  }

  const handleClickJoin = async (user_id: number, team_id: number) => {
    const { data } = await mutateAsyncPatch({ user_id, team_id })
    setTeam((prev) => ({ ...prev, team_members: data.team_members }))
    setRole((prev) => ({ ...prev, isCaptain: true }))
  }

  useEffect(() => {
    if (isSuccess) {
      setTeam(data.data)
    }
  }, [isLoading])

  return (
    <>
      {!edit ? (
        <Modal ref={ref} className={styles.modal_container} isError={isError} isLoading={isLoading}>
          {isSuccess && (
            <>
              <div className={styles.modal_header}>
                <Typography tag='h2' variant='text_32_b' className={styles.head}>
                  {team.team_name}
                </Typography>
                <Close className={styles.close} onClick={handleClickClose} />
              </div>
              <div className={styles.modal_body}>
                <div className={styles.numeric_data}>
                  <NumericData
                    numberData={team.team_rating}
                    name='Рейтинг'
                    className={styles.rating}
                  />
                  <NumericData
                    numberData={team.team_points}
                    name='Баллы'
                    className={styles.points}
                  />
                </div>
                <div className={styles.desc_container}>
                  <Typography tag='h2' variant='text_20_b'>
                    Описание
                  </Typography>
                  <Typography tag='p' variant='text_16_r' className={styles.desc}>
                    {team.team_desc}
                  </Typography>
                </div>
                <div className={styles.captain}>
                  <Typography tag='h2' variant='text_20_b'>
                    Капитан
                  </Typography>
                  <Typography tag='p' variant='text_16_r'>
                    {team.team_captain_name}
                  </Typography>
                </div>
                <div className={styles.members}>
                  <Typography tag='p' variant='text_20_b'>
                    Участники
                  </Typography>
                  <div className={styles.members_list}>
                    <ul>
                      {team.team_members?.map((member) => (
                        <li key={member.username}>{member.username}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {role.role === 'player' && team.team_captain_id === role.id && (
                  <div className={styles.invitation}>
                    <Typography tag='p' variant='text_20_b'>
                      Ссылка-приглашение
                    </Typography>
                  </div>
                )}
              </div>
              <div className={styles.modal_footer}>
                {role.role === 'player' && team.team_captain_id === role.id && (
                  <div className={styles.buttons}>
                    <Button
                      className={styles.button}
                      variant='secondary'
                      onClick={() => handleClickDelete(id)}
                    >
                      Удалить
                    </Button>
                    <Button className={styles.button} onClick={() => setEdit(true)}>
                      Редактировать
                    </Button>
                  </div>
                )}
                {role.role === 'player' &&
                  !team.team_members.filter((member) => member.id === role.id)[0] && (
                    <Button
                      className={styles.button}
                      onClick={() => handleClickJoin(role.id, team.team_id as number)}
                    >
                      Вступить в команду
                    </Button>
                  )}
                {role.role === 'player' &&
                  team.team_members.filter((member) => member.id === role.id)[0] &&
                  team.team_captain_id !== role.id && (
                    <Typography tag='h2' variant='text_16_b'>
                      Вы уже состоите в команде
                    </Typography>
                  )}
              </div>
            </>
          )}
        </Modal>
      ) : (
        <EditTeamModal
          ref={ref}
          head='Редактировать команду'
          mode='edit'
          formValues={{ team_name: team.team_name, team_desc: team.team_desc }}
          setEdit={() => setEdit(false)}
        />
      )}
    </>
  )
})
