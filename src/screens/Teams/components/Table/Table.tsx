import { forwardRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import styles from '@screens/Teams/components/Table/Table.module.css'
import { Team } from '@screens/Teams/types'
import { getDate, useGetTeamsQuery } from '@screens/Teams/utils'
import { Typography } from '@shared'

import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { LoaderTeam } from '../LoaderTeam/LoaderTeam'
import { modalAtom } from '../Modals/Modal.atom'
import { TeamModal } from '../Modals/TeamModal/TeamModal'

import { teamsTableAtom } from './Table.atom'

const headerTable = ['Место', 'Команда', 'Дата создания', 'Игры', 'Баллы']

export const Table = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeTeam, setActiveTeam] = useState<number>(-1)
  const teams = useRecoilValue(teamsTableAtom)
  const [showModal, setShowModal] = useRecoilState(modalAtom)
  const { isLoading, isError } = useGetTeamsQuery()

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
          {headerTable.map((value) => (
            <Typography key={value} tag='div' variant='text_16_b' className={styles.col}>
              {value}
            </Typography>
          ))}
        </div>
        <ErrorMessage isError={isError} className={styles.error} />
        <LoaderTeam isLoading={isLoading} />
        {teams.map((team: Team) => (
          <div className={styles.row} key={team.team_id} onClick={() => handleClick(team)}>
            <div className={styles.col}>{team.rating}</div>
            <div className={styles.col}>{team.team_name}</div>
            <div className={styles.col}>{getDate(team.creation_date)}</div>
            <div className={styles.col}>{team.played_games}</div>
            <div className={styles.col}>{team.points}</div>
          </div>
        ))}
      </div>
      {showModal.showTeam && <TeamModal ref={ref} id={activeTeam} />}
    </>
  )
})
