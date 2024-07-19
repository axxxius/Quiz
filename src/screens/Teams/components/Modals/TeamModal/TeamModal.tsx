import { forwardRef, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import Close from '@assets/icons/close.svg?react'
import { NumericData } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/TeamModal/TeamModal.module.css'
import { FullTeam, Team } from '@screens/Teams/types'
import { useDeleteTeamMutation, useGetTeamQuery } from '@screens/Teams/utils/api/hooks'
import { Button, Modal, Typography } from '@shared'

import { teamsTableAtom } from '../../Table/Table.atom'
import { modalAtom, ShowModal } from '../Modal.atom'

import { teamAtom } from './Team.atom'

interface TeamModalProps {
  id: number
}

export const TeamModal = forwardRef<HTMLDivElement, TeamModalProps>(({ id }, ref) => {
  const role: string = 'cap'
  const isMember = false
  const { data, isLoading, isSuccess } = useGetTeamQuery(id)
  const { mutateAsync } = useDeleteTeamMutation(id);
  const [team, setTeam] = useRecoilState<FullTeam>(teamAtom)
  const [teams, setTeams] = useRecoilState<Team[]>(teamsTableAtom)
  const setShowModal = useSetRecoilState<ShowModal>(modalAtom)

  const handleClick = () => {
    setShowModal((prev) => ({
      ...prev,
      showTeam: false
    }))
  }

  const handleClickDelete = async (id: number) => {
    await mutateAsync(id)
    setTeams(teams.filter((elem) => elem.team_id !== id))
    handleClick()
  }

  useEffect(() => {
    if (isSuccess) {
      setTeam(data.data)
    }
  }, [isLoading])

  return (
    <>
      {isSuccess && (
        <Modal ref={ref} className={styles.modal_container}>
          <div className={styles.modal_header}>
            <Typography tag='h2' variant='text_32_b' className={styles.head}>
              {team.team_name}
            </Typography>
            <Close className={styles.close} onClick={handleClick} />
          </div>
          <div className={styles.modal_body}>
            <div className={styles.numeric_data}>
              <NumericData numberData={team.team_rating} name='Рейтинг' className={styles.rating} />
              <NumericData numberData={team.team_points} name='Баллы' className={styles.points} />
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
                {team.captain_name}
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
            {role === 'cap' && (
              <div className={styles.invitation}>
                <Typography tag='p' variant='text_20_b'>
                  Ссылка-приглашение
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.modal_footer}>
            {role === 'cap' && (
              <Button className={styles.button} onClick={() => handleClickDelete(id)}>
                Удалить команду
              </Button>
            )}
            {role === 'member' && !isMember && (
              <Button className={styles.button} onClick={handleClick}>
                Вступить в команду
              </Button>
            )}
            {role === 'member' && isMember && (
              <Typography tag='h2' variant='text_16_b'>
                Вы уже состоите в команде
              </Typography>
            )}
          </div>
        </Modal>
      )}
    </>
  )
})
