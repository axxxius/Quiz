import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import TeamIcon from '@assets/icons/user-group.svg?react'
import { useOnClickOutside, useRole } from '@hooks'
import { Button, Search, Typography } from '@shared'

import { modalAtom, ShowModal } from './components/Modals/Modal.atom'
import { AllTeamsTable, Dropdown, EditTeamModal, MyTeamsTable } from './components'
import { SORT_TEAMS } from './const'
import styles from './Teams.module.css'
import { OptionSort } from './types'

const Teams = () => {
  const [showModal, setShowModal] = useRecoilState<ShowModal>(modalAtom)
  const modalRef = useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = useState<OptionSort>(SORT_TEAMS[0])
  const [search, setSearch] = useState<string>('')
  const { role } = useRole()
  const [myTeams, setMyTeams] = useState(false)

  const handleClickModal = () => {
    setShowModal((prev) => ({
      ...prev,
      showCreatingTeam: true
    }))
  }

  const handleClickTeams = () => {
    setMyTeams(!myTeams)
  }

  useOnClickOutside(modalRef, () =>
    setShowModal({
      showCreatingTeam: false,
      showTeam: false
    })
  )

  return (
    <>
      <div className={styles.container}>
        <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
          Рейтинг команд
        </Typography>
        <div className={styles.main}>
          <div className={styles.creating_team_lead}>
            <Search setSearch={setSearch} />
            {role === 'player' && (
              <Button className={styles.button} onClick={handleClickModal}>
                Создать команду
              </Button>
            )}
          </div>
          <div className={styles.sort_teams_container}>
            <div className={styles.sorting}>
              <Typography tag='div' variant='text_16_r'>
                Сортировать по
              </Typography>
              <Dropdown
                options={SORT_TEAMS}
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
              />
            </div>
            <div className={styles.teams} onClick={handleClickTeams}>
              <TeamIcon />
              <Typography tag='div' variant='text_16_b' className={styles.filter_teams}>
                {!myTeams ? 'Мои команды' : 'Все команды'}
              </Typography>
            </div>
          </div>
          {myTeams && <MyTeamsTable search={search} selectedValue={selectedValue} ref={modalRef} />}
          {!myTeams && (
            <AllTeamsTable search={search} selectedValue={selectedValue} ref={modalRef} />
          )}
        </div>
        {showModal.showCreatingTeam && (
          <EditTeamModal head='Создать команду' mode='create' ref={modalRef} />
        )}
      </div>
    </>
  )
}

export default Teams
