import { forwardRef, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { useDebounce } from '@hooks'
import { authAtom } from '@screens/Auth/Auth.atom'
import { OptionSort, Table } from '@screens/Teams'
import { Typography } from '@shared'
import { useGetTeamsQuery } from '@utils'

import { teamAtom } from '../../Modals/TeamModal/Team.atom'
import { myTeamsTableAtom } from '../MyTeamsTable/MyTeamsTable.atom'

import { allTeamsTableAtom } from './AllTeamsTable.atom'
import styles from './AllTeamsTable.module.css'

interface AllTeamsTable {
  selectedValue: OptionSort
  search: string
}

export const AllTeamsTable = forwardRef<HTMLDivElement, AllTeamsTable>(
  ({ selectedValue, search }, ref) => {
    const team = useRecoilValue(teamAtom)
    const [teamsTable, setTeamsTable] = useRecoilState(allTeamsTableAtom)
    const myTeams = useRecoilValue(myTeamsTableAtom)
    const debouncedSearch = useDebounce(search, 500)
    const authState = useRecoilValue(authAtom)
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
      page,
      myTeams
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
            disabled={teamsTable.teams?.length < 10}
          >
            Следующая -&gt;
          </button>
        </div>
        <Table isError={isError} teams={teamsTable.teams} ref={ref} mode={'allTeams'} />
      </>
    )
  }
)
