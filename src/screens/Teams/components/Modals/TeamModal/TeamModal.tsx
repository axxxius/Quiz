import { Dispatch, SetStateAction } from 'react';

import Close from '@assets/icons/close.svg?react'
import { Modal, TeamForm } from '@screens/Teams/components'
import styles from '@screens/Teams/components/Modals/TeamModal/TeamModal.module.css'
import { Button,Typography } from '@shared'


interface TeamFormProps {
    refModal: React.MutableRefObject<null>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const TeamModal = ({ refModal, setShowModal }: TeamFormProps) => {
    return (
        <>
            <Modal refModal={refModal}>
                <div className={styles.modal_header}>
                    <Typography tag='h2' variant='text_32_b' className={styles.head}>Создать команду</Typography>
                    <Close className={styles.close} onClick={() => setShowModal(false)} />
                </div>
                <div className={styles.modal_body}>
                    <TeamForm />
                </div>
                <div className={styles.modal_footer}>
                    <Button className={styles.button} onClick={() => setShowModal(false)}>Создать команду</Button>
                </div>
            </Modal>
        </>
    )
}