import styles from '@screens/Teams/components/Modals/Modal/Modal.module.css'
import { classnames } from '@utils';

interface ModalProps {
    modalRef: React.MutableRefObject<null>;
    children:  React.ReactNode;
    className?: string 
}

export const Modal = ({ modalRef: refModal, children, className }: ModalProps) => {
    const stylesModalContent = classnames(styles.modal_content, className);
    return (
        <div className={styles.modal_backdrop}>
            <div className={stylesModalContent} ref={refModal}>
                {children}
            </div>
        </div>
    )
}