import { forwardRef } from 'react'
import { useSetRecoilState } from 'recoil'

import Close from '@assets/icons/close.svg?react'
import { CreatingTeamForm, EditTeamForm, EditTeamFormValues } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/EditTeamModal/EditTeamModal.module.css'
import { Modal, Typography } from '@shared'

import { modalAtom, ShowModal } from '../Modal.atom'

interface EditTeamModalProps {
  head: string
  mode: 'edit' | 'create'
  formValues?: EditTeamFormValues
  setEdit?: () => void
}

export const EditTeamModal = forwardRef<HTMLDivElement, EditTeamModalProps>(
  ({ head, mode, formValues, setEdit }: EditTeamModalProps, ref) => {
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
            {head}
          </Typography>
          {mode === 'create' && <Close className={styles.close} onClick={handleClick} />}
        </div>
        <div className={styles.modal_body}>
          {mode === 'create' ? (
            <CreatingTeamForm handleClose={handleClick} />
          ) : (
            <EditTeamForm formValues={formValues} setEdit={setEdit} />
          )}
        </div>
      </Modal>
    )
  }
)
