import { Modal } from '@shared'
import styles from './NewGameModal.module.css'

interface NewGameModalProps {
  onClose: () => void
  visible: boolean
}

export const NewGameModal = ({ onClose, visible }: NewGameModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={styles.modal_content}></div>
    </Modal>
  )
}
