import { Dispatch, forwardRef, SetStateAction } from 'react'

import Close from '@assets/icons/close.svg?react'
import { NumericData } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/TeamModal/TeamModal.module.css'
import { FullTeam, ShowModal } from '@screens/Teams/types'
import { useGetTeamQuery } from '@screens/Teams/utils/api/hooks'
import { Button, Modal, Typography } from '@shared'

interface TeamModalProps {
  id: number
  setShowModal: Dispatch<SetStateAction<ShowModal>>
}

export const TeamModal = forwardRef<HTMLDivElement, TeamModalProps>(({ setShowModal, id }, ref) => {
  const role: string = 'cap'
  const isMember = true
  const { data } = useGetTeamQuery(id)
  const team = data?.data as FullTeam

  const handleClick = () => {
    setShowModal((prev) => ({
      ...prev,
      team: false
    }))
  }

  return (
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
            <ul>{team.team_members?.map((member) => <li key={member}>{member}</li>)}</ul>
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
  )
})
