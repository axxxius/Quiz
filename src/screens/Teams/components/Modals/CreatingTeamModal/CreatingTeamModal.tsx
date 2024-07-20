import { forwardRef } from 'react'
import { useSetRecoilState } from 'recoil'

import Close from '@assets/icons/close.svg?react'
import { TeamForm } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/CreatingTeamModal/CreatingTeamModal.module.css'
import { Modal, Typography } from '@shared'

import { modalAtom, ShowModal } from '../Modal.atom'

export const CreatingTeamModal = forwardRef<HTMLDivElement>((_, ref) => {
  const setShowModal = useSetRecoilState<ShowModal>(modalAtom)

  const handleClick = () => {
    setShowModal((prev) => ({
      ...prev,
      showCreatingTeam: false
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
        <TeamForm handleClose={handleClick} />
      </div>
    </Modal>
  )
})
