import { forwardRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import styles from '@screens/Teams/components/Tables/Table/Table.module.css'
import { HEADER_TABLE } from '@screens/Teams/const'
import { Team } from '@screens/Teams/types'
import { Typography } from '@shared'
import { getDate } from '@utils'

import { ErrorMessage } from '../../ErrorMessage/ErrorMessage'
import { modalAtom } from '../../Modals/Modal.atom'
import { TeamModal } from '../../Modals/TeamModal/TeamModal'

interface TableProps {
  isError: boolean
  teams: Team[]
  mode: 'allTeams' | 'myTeams'
}

export const Table = forwardRef<HTMLDivElement, TableProps>(({ isError, teams, mode }, ref) => {
  const [activeTeam, setActiveTeam] = useState<number>(-1)
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
          {HEADER_TABLE.map((value) => (
            <Typography key={value} tag='div' variant='text_16_b' className={styles.col}>
              {value}
            </Typography>
          ))}
        </div>
        {!teams && !isError && (
          <Typography tag='div' variant='text_24_b' className={styles.no_comand}>
            Нет команд
          </Typography>
        )}
        <ErrorMessage isError={isError} className={styles.error} />
        <>
          {teams.map((team: Team) => (
            <div className={styles.row} key={team.team_id} onClick={() => handleClick(team)}>
              <div className={styles.col}>{team.team_place}</div>
              <div className={styles.col}>{team.team_name}</div>
              <div className={styles.col}>{getDate(team.team_creation_date)}</div>
              <div className={styles.col}>{team.team_played_games}</div>
              <div className={styles.col}>{team.team_points}</div>
            </div>
          ))}
        </>
      </div>
      {showModal.showTeam && <TeamModal ref={ref} id={activeTeam} teams={teams} mode={mode} />}
    </>
  )
})
