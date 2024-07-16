import { Dispatch, SetStateAction } from 'react';

import Close from '@assets/icons/close.svg?react'
import { Modal, TeamForm } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/CreatingTeamModal/CreatingTeamModal.module.css'
import { ShowModal } from '@screens/Teams/Teams.types';
import { Button, Typography } from '@shared'


interface CreatingTeamModalProps {
    modalRef: React.MutableRefObject<null>;
    setShowModal: Dispatch<SetStateAction<ShowModal>>;
}

export const CreatingTeamModal = ({ modalRef, setShowModal }: CreatingTeamModalProps) => {
    const handleClick = () => {
        setShowModal((prev) => ({
            ...prev,
            creatingTeam: false
        }))
    }
    return (
        <Modal modalRef={modalRef}>
            <div className={styles.modal_header}>
                <Typography tag='h2' variant='text_32_b' className={styles.head}>
                    Создать команду
                </Typography>
                <Close className={styles.close} onClick={handleClick} />
            </div>
            <div className={styles.modal_body}>
                <TeamForm />
            </div>
            <div className={styles.modal_footer}>
                <Button className={styles.button} onClick={handleClick}>Создать команду</Button>
            </div>
        </Modal>
    )
}