import { forwardRef, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import Close from '@assets/icons/close.svg?react'
import { useRole } from '@hooks'
import { authAtom } from '@screens/Auth/Auth.atom'
import { EditTeamModal, NumericData } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/TeamModal/TeamModal.module.css'
import { captainAtom } from '@screens/Teams/Teams.atom'
import { FullTeam } from '@screens/Teams/types'
import { Button, Modal, Typography } from '@shared'
import { useDeleteTeamMutation, useGetTeamQuery, useJoinTeamMutation } from '@utils'

import { TeamsTable, teamsTableAtom } from '../../Table/Table.atom'
import { modalAtom, ShowModal } from '../Modal.atom'

import { teamAtom } from './Team.atom'

interface TeamModalProps {
  id: number
}

export const TeamModal = forwardRef<HTMLDivElement, TeamModalProps>(({ id }, ref) => {
  const { mutateAsync } = useDeleteTeamMutation(id)
  const { mutateAsync: mutateAsyncPatch } = useJoinTeamMutation(id)
  const [team, setTeam] = useRecoilState<FullTeam>(teamAtom)
  const [teamsTable, setTeamsTable] = useRecoilState<TeamsTable>(teamsTableAtom)
  const setShowModal = useSetRecoilState<ShowModal>(modalAtom)
  const setIsCaptain = useSetRecoilState(captainAtom)
  const [edit, setEdit] = useState(false)
  const { data, isLoading, isSuccess, isError } = useGetTeamQuery(id, team)
  const authState = useRecoilValue(authAtom)
  const { role } = useRole()

  const handleClickClose = () => {
    setShowModal((prev) => ({
      ...prev,
      showTeam: false
    }))
  }

  const handleClickDelete = async (id: number) => {
    await mutateAsync(id)
    setTeamsTable({
      teams: teamsTable.teams.filter((elem) => elem.team_id !== id)
    })
    handleClickClose()
    setIsCaptain('player')
  }

  const handleClickJoin = async (user_id: number, team_id: number) => {
    const { data } = await mutateAsyncPatch({ user_id, team_id })
    setTeam((prev) => ({ ...prev, team_members: data.team_members }))
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
                    numberData={team.team_place}
                    name='Место'
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
                    {team.team_desc || 'Нет описания'}
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
                {role === 'player' && team.team_captain_id === authState.user.id && (
                  <div className={styles.invitation}>
                    <Typography tag='p' variant='text_20_b'>
                      Ссылка-приглашение
                    </Typography>
                  </div>
                )}
              </div>
              <div className={styles.modal_footer}>
                {role === 'player' && team.team_captain_id === authState.user.id && (
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
                {role === 'player' &&
                  !team.team_members.filter((member) => member.id === authState.user.id)[0] && (
                    <Button
                      className={styles.button}
                      onClick={() => handleClickJoin(authState.user.id, team.team_id as number)}
                    >
                      Вступить в команду
                    </Button>
                  )}
                {role === 'player' &&
                  team.team_members.filter((member) => member.id === authState.user.id)[0] &&
                  team.team_captain_id !== authState.user.id && (
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
