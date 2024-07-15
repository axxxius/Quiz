import styles from '@screens/Teams/components/Modals/Modal/Modal.module.css'

interface ModalProps {
    refModal: React.MutableRefObject<null>;
    children:  React.ReactNode;
}

export const Modal = ({ refModal, children }: ModalProps) => {
    return (
        <div className={styles.modal_backdrop}>
            <div className={styles.modal_content} ref={refModal}>
                {children}
            </div>
        </div>
    )
}