import { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useDebounce, useOnClickOutside, useRole } from '@hooks'
import { authAtom } from '@screens/Auth/Auth.atom'
import { Button, Search, Typography } from '@shared'
import { useGetTeamsQuery } from '@utils'

import { modalAtom, ShowModal } from './components/Modals/Modal.atom'
import { teamAtom } from './components/Modals/TeamModal/Team.atom'
import { teamsTableAtom } from './components/Table/Table.atom'
import { Dropdown, EditTeamModal, Table } from './components'
import { SORT_TEAMS } from './const'
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
  const { role } = useRole()
  const [page, setPage] = useState(1)
  const { data, isSuccess, isLoading, isError } = useGetTeamsQuery(
    {
      params: { ordering: selectedValue.value, search: debouncedSearch, page: page }
    },
    selectedValue.value,
    team.team_name,
    debouncedSearch,
    teamsTable,
    authState.user.id,
    page
  )

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
        <div className={styles.main}>
          <div className={styles.creating_team_lead}>
            <Search setSearch={setSearch} />
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
          <div className={styles.pagination_container}>
            <button
              className={styles.pagination_btns}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;- Предыдущая
            </button>
            <Typography variant='text_20_b'>Страница {page}</Typography>
            <button
              className={styles.pagination_btns}
              onClick={() => setPage(page + 1)}
              disabled={teamsTable.teams.length < 10} //games.length < 10
            >
              Следующая -&gt;
            </button>
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
