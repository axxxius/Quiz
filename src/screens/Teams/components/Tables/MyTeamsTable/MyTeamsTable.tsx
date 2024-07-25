import { forwardRef, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useDebounce, useRole } from '@hooks'
import { authAtom } from '@screens/Auth/Auth.atom'
import { OptionSort, Table } from '@screens/Teams'
import { Typography } from '@shared'
import { useGetMyTeamsQuery } from '@utils'

import { teamAtom } from '../../Modals/TeamModal/Team.atom'
import { allTeamsTableAtom } from '../AllTeamsTable/AllTeamsTable.atom'

import { myTeamsTableAtom } from './MyTeamsTable.atom'
import styles from './MyTeamsTable.module.css'

interface MyTeamsTable {
  selectedValue: OptionSort
  search: string
}

export const MyTeamsTable = forwardRef<HTMLDivElement, MyTeamsTable>(
  ({ selectedValue, search }, ref) => {
    const team = useRecoilValue(teamAtom)
    const [teamsTable, setTeamsTable] = useRecoilState(myTeamsTableAtom)
    const allTeams = useRecoilValue(allTeamsTableAtom)
    const debouncedSearch = useDebounce(search, 500)
    const authState = useRecoilValue(authAtom)
    const { role } = useRole()
    const [page, setPage] = useState(1)

    const { data, isSuccess, isLoading, isError } = useGetMyTeamsQuery(
      {
        params: { ordering: selectedValue.value, search: debouncedSearch, page: page }
      },
      selectedValue.value,
      team.team_name,
      team.team_members,
      debouncedSearch,
      teamsTable,
      authState.user.id,
      page,
      allTeams
    )

    useEffect(() => {
      if (isSuccess) {
        setTeamsTable(data.data)
      }
    }, [isLoading, selectedValue, debouncedSearch])
    return (
      <>
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
            disabled={teamsTable.user_teams?.length < 10}
          >
            Следующая -&gt;
          </button>
        </div>
        {!authState.user.username && (
          <Typography variant='text_20_b' className={styles.no_auth}>
            Авторизуйтесь, чтобы посмотреть свои команды
          </Typography>
        )}
        {role === 'leading' && (
          <Typography variant='text_20_b' className={styles.no_auth}>
            Ведущий не может иметь свои команды
          </Typography>
        )}
        {authState.user.username && role === 'player' && (
          <Table isError={isError} teams={teamsTable.user_teams} mode={'myTeams'} ref={ref} />
        )}
      </>
    )
  }
)
