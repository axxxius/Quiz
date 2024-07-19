import { forwardRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import styles from '@screens/Teams/components/Table/Table.module.css'
import { Team } from '@screens/Teams/types'
import { Typography } from '@shared'

import { modalAtom } from '../Modals/Modal.atom'
import { TeamModal } from '../Modals/TeamModal/TeamModal'

import { teamsTableAtom } from './Table.atom'

export const Table = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeTeam, setActiveTeam] = useState<number>(-1)
  const teams = useRecoilValue(teamsTableAtom)
  const [showModal, setShowModal] = useRecoilState(modalAtom)

  const handleClick = (team: Team) => {
    setActiveTeam(team.team_id)
    setShowModal((prev) => ({
      ...prev,
      showTeam: true
    }))
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
        {teams.map((team: Team) => (
          <div className={styles.row} key={team.team_id} onClick={() => handleClick(team)}>
            <div className={styles.col}>{team.rating}</div>
            <div className={styles.col}>{team.team_name}</div>
            <div className={styles.col}>{team.creation_date}</div>
            <div className={styles.col}>{team.played_games}</div>
            <div className={styles.col}>{team.points}</div>
          </div>
        ))}
      </div>
      {showModal.showTeam && <TeamModal ref={ref} id={activeTeam} />}
    </>
  )
})
