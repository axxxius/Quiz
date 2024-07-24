import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { useDebounce, useOnClickOutside, useRole } from '@hooks'
import { Button, Search, Typography } from '@shared'
import { classnames, useGetTeamsQuery } from '@utils'

import { modalAtom, ShowModal } from './components/Modals/Modal.atom'
import { teamAtom } from './components/Modals/TeamModal/Team.atom'
import { teamsTableAtom } from './components/Table/Table.atom'
import { Dropdown, EditTeamModal, Table } from './components'
import { SORT_TEAMS } from './const'
import styles from './Teams.module.css'
import { OptionSort } from './types'

const Teams = () => {
  const setTeamsTable = useSetRecoilState(teamsTableAtom)
  const team = useRecoilValue(teamAtom)
  const [showModal, setShowModal] = useRecoilState<ShowModal>(modalAtom)
  const modalRef = useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = useState<OptionSort>(SORT_TEAMS[0])
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 500)
  // const [isCaptain, setIsCaptain] = useRecoilState(captainAtom)
  // const [isCaptain, setIsCaptain] = useState(!!teams.find((team) => team.captain_id === authState.user.id))
  const { role } = useRole()
  const { data, isSuccess, isLoading, isError } = useGetTeamsQuery(
    {
      params: { ordering: selectedValue.value, search: debouncedSearch }
    },
    selectedValue.value,
    team.team_name,
    debouncedSearch
  )

  const stylesCreatingTeam = classnames(styles.creating_team, {
    // [styles.creating_team_lead]: !isCaptain && role === 'player'
    [styles.creating_team_lead]: role === 'player'
  })

  const handleClick = () => {
    setShowModal((prev) => ({
      ...prev,
      showCreatingTeam: true
    }))
  }

  useOnClickOutside(modalRef, () =>
    setShowModal({
      showCreatingTeam: false,
      showTeam: false
    })
  )

  useEffect(() => {
    if (isSuccess) {
      setTeamsTable(data.data)
    }
  }, [isLoading, selectedValue, debouncedSearch])

  // console.log(teamsTable)

  return (
    <>
      <div className={styles.container}>
        <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
          Рейтинг команд
        </Typography>
        <div className={styles.main}>
          <div className={stylesCreatingTeam}>
            <Search setSearch={setSearch} />
            {/* {role === 'player' && !isCaptain && ( */}
            {role === 'player' && (
              <Button className={styles.button} onClick={handleClick}>
                Создать команду
              </Button>
            )}
          </div>
          <div className={styles.sorting}>
            <Typography tag='h4' variant='text_16_r'>
              Сортировать по
            </Typography>
            <Dropdown
              options={SORT_TEAMS}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            />
          </div>
          <Table ref={modalRef} isError={isError} />
        </div>
        {showModal.showCreatingTeam && (
          <EditTeamModal head='Создать команду' mode='create' ref={modalRef} />
        )}
      </div>
    </>
  )
}

export default Teams
