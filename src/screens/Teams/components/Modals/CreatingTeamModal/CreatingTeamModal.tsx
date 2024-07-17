import { Dispatch, forwardRef, SetStateAction } from 'react'

import Close from '@assets/icons/close.svg?react'
import { TeamForm } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/CreatingTeamModal/CreatingTeamModal.module.css'
import { ShowModal } from '@screens/Teams/types'
import { Modal, Typography } from '@shared'

interface CreatingTeamModalProps {
  setShowModal: Dispatch<SetStateAction<ShowModal>>
}

export const CreatingTeamModal = forwardRef<HTMLDivElement, CreatingTeamModalProps>(
  ({ setShowModal }, ref) => {
    const handleClick = () => {
      setShowModal((prev) => ({
        ...prev,
        creatingTeam: false
      }))
    }

    return (
      <Modal ref={ref}>
        <div className={styles.modal_header}>
          <Typography tag='h2' variant='text_32_b' className={styles.head}>
            Создать команду
          </Typography>
          <Close className={styles.close} onClick={handleClick} />
        </div>
        <div className={styles.modal_body}>
          <TeamForm handleClick={handleClick} />
        </div>
      </Modal>
    )
  }
)
