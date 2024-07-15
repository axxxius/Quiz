import { DropdownWhite, Search, Table, TeamModal } from '@screens/Teams/components';
import styles from './Teams.module.css'
import { Button, Typography } from '@shared';
import { classnames } from '@utils';
import { useRef, useState } from 'react';
import { useOnClickOutside } from './../../hooks/useOnClickOutside';

const Teams = () => {
    const [showModal, setShowModal] = useState(false);
    const refPopup = useRef(null);
    const role = 'lead';
    const isLead = role == 'lead';
    const stylesCreatingTeam = classnames(styles.creating_team, {
        [styles.creating_team_lead]: isLead
    })
    const handleClick = () => {
        setShowModal(true);
    }
    useOnClickOutside(refPopup, () => setShowModal(false));
    return (
        <div>
            <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
                Рейтинг команд
            </Typography>   
            <div className={styles.main}>
                <div className={stylesCreatingTeam}>
                    <Search isLead={isLead} />
                    {isLead && <Button className={styles.button} onClick={handleClick}>Создать команду</Button>}
                </div>
                <div className={styles.sorting}>
                    <Typography tag='h4' variant='text_16_r'>
                        Сортировать по
                    </Typography>
                    <DropdownWhite />
                </div>
                <Table />
            </div>
            {showModal && <TeamModal refModal={refPopup} setShowModal={setShowModal} />}
        </div>
    )
}

export default Teams;