import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useDebounce, useOnClickOutside, useRole } from '@hooks'
import { authAtom } from '@screens/Auth/Auth.atom'
import { Button, Search, Typography } from '@shared'
import { classnames, useGetTeamsQuery, useGetUserQuery } from '@utils'

import { modalAtom, ShowModal } from './components/Modals/Modal.atom'
import { teamAtom } from './components/Modals/TeamModal/Team.atom'
import { teamsTableAtom } from './components/Table/Table.atom'
import { Dropdown, EditTeamModal, LoaderTeam, Table } from './components'
import { SORT_TEAMS } from './const'
import { captainAtom } from './Teams.atom'
import styles from './Teams.module.css'
import { OptionSort } from './types'

const Teams = () => {
  const [teamsTable, setTeamsTable] = useRecoilState(teamsTableAtom)
  const team = useRecoilValue(teamAtom)
  const [showModal, setShowModal] = useRecoilState<ShowModal>(modalAtom)
  const modalRef = useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = useState<OptionSort>(SORT_TEAMS[0])
  const [search, setSearch] = useState<string>('')
  const authState = useRecoilValue(authAtom)
  const debouncedSearch = useDebounce(search, 500)
  const isCaptain = useRecoilValue(captainAtom)
  const {
    data: user,
    isSuccess: isSuccessUser,
    isLoading: isLoadingUser
  } = useGetUserQuery(isCaptain)
  const { role } = useRole()
  const { data, isSuccess, isLoading, isError } = useGetTeamsQuery(
    {
      params: { ordering: selectedValue.value, search: debouncedSearch }
    },
    selectedValue.value,
    team.team_name,
    debouncedSearch,
    teamsTable,
    authState.user.id
  )

  const stylesCreatingTeam = classnames(styles.creating_team, {
    [styles.creating_team_lead]: !user?.data.is_captain && role === 'player'
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

  return (
    <>
      <div className={styles.container}>
        <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
          Рейтинг команд
        </Typography>
        {isLoadingUser && <LoaderTeam isLoading={isLoading} />}
        {isSuccessUser && (
          <div className={styles.main}>
            <div className={stylesCreatingTeam}>
              <Search setSearch={setSearch} />
              {role === 'player' && !user?.data.is_captain && (
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
        )}
        {showModal.showCreatingTeam && (
          <EditTeamModal head='Создать команду' mode='create' ref={modalRef} />
        )}
      </div>
    </>
  )
}

export default Teams
