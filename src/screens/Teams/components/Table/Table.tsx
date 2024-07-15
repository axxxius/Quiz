import styles from '@screens/Teams/components/Table/Table.module.css'
import { Team } from '@screens/Teams/Teams.types'
import { Typography } from '@shared'

const mockTeams: Team[] = [
    {
        id: 1,
        team_name: "Смешарики",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 1
    },
    {
        id: 2,
        team_name: "Лютики",
        creation_date: "11.01.2023",
        played_games: 200,
        points: 100,
        rating: 2
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


export const Table = () => {
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
                {mockTeams.map((team: Team) => {
                    return (
                        <div className={styles.row} key={team.id}>
                            <div className={styles.col}>{team.rating}</div>
                            <div className={styles.col}>{team.team_name}</div>
                            <div className={styles.col}>{team.creation_date}</div>
                            <div className={styles.col}>{team.played_games}</div>
                            <div className={styles.col}>{team.points}</div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}