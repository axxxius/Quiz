import { Dispatch, forwardRef, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';

import styles from '@screens/Teams/components/Table/Table.module.css'
import { MockTeam, ShowModal, Team } from '@screens/Teams/types'
import { useGetTeamsQuery } from '@screens/Teams/utils/api/hooks';
import { Typography } from '@shared'

import { TeamModal } from '../Modals/TeamModal/TeamModal';

import { teamsTableAtom } from './Table.atom';

const mockTeams: MockTeam[] = [
    {
        id: 1,
        team_name: "Смешарики",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 10000,
        rating: 1,
        team_desc: "Мы самая лучшая команда, присоединяйся к нам поскорее! Мы самая лучшая команда, присоединяйся к нам поскорее!Мы самая лучшая команда, присоединяйся к нам поскорее!Мы самая лучшая команда, присоединяйся к нам поскорее!Мы самая лучшая команда, присоединяйся к нам поскорее!Мы самая лучшая команда, присоединяйся к нам поскорее!Мы самая лучшая команда, присоединяйся к нам поскорее!",
        captain_name: "Петров Петр Петрович",
        team_members: [
            "Петров Петр Петрович",
            "Плюшкин Плюшка Плюшкович",
            "Иванов Иван Иванович",
            "Денисов Денис Денисович"
        ]
    },
    {
        id: 2,
        team_name: "Лютики",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 2,
        team_desc: "Мы всех порвем, присоединяйся к нам поскорее!",
        captain_name: "Иванов Иван Иванович",
        team_members: [
            "Петров Петр Петрович",
            "Плюшкин Плюшка Плюшкович",
            "Иванов Иван Иванович",
            "Денисов Денис Денисович"
        ]
    },
    {
        id: 3,
        team_name: "Ромашки",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 3
    },
    {
        id: 4,
        team_name: "Тюльпаны",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 4
    },
    {
        id: 5,
        team_name: "Одуванчики",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 5
    },
    {
        id: 6,
        team_name: "Маки",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 6
    },
    {
        id: 7,
        team_name: "Розы",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 7
    },
    {
        id: 8,
        team_name: "Незабудки",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 8
    },
]

console.log(mockTeams);

interface TableProps {
    showModal: ShowModal;
    setShowModal: Dispatch<SetStateAction<ShowModal>>;
}

export const Table = forwardRef<HTMLDivElement, TableProps>(({ showModal, setShowModal }, ref) => {
    const [activeTeam, setActiveTeam] = useState<number>(-1);
    const teams = useRecoilValue(teamsTableAtom);
    const { data } = useGetTeamsQuery();

    console.log(data);

    const handleClick = (team: Team) => {
        setActiveTeam(team.team_id);
        setShowModal((prev) => ({
            ...prev,
            team: true
        }));
    }

    return (
        <>
            <div className={styles.table}>
                <div className={styles.head}>
                    <Typography tag='div' variant='text_16_b' className={styles.col}>
                        Место
                    </Typography>
                    <Typography tag='div' variant='text_16_b' className={styles.col}>
                        Команда
                    </Typography>
                    <Typography tag='div' variant='text_16_b' className={styles.col}>
                        Дата создания
                    </Typography>
                    <Typography tag='div' variant='text_16_b' className={styles.col}>
                        Игры
                    </Typography>
                    <Typography tag='div' variant='text_16_b' className={styles.col}>
                        Баллы
                    </Typography>
                </div>
                {teams.map((team: Team) => {
                    return (
                        <div className={styles.row} key={team.team_id} onClick={() => handleClick(team)}>
                            <div className={styles.col}>{team.rating}</div>
                            <div className={styles.col}>{team.team_name}</div>
                            <div className={styles.col}>{team.creation_date}</div>
                            <div className={styles.col}>{team.played_games}</div>
                            <div className={styles.col}>{team.points}</div>
                        </div>
                    )
                })}
            </div>
            {showModal.team && <TeamModal ref={ref} setShowModal={setShowModal} id={activeTeam} />}
        </>
    )
}
)