import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { useOnClickOutside } from '@hooks'
import { CreatingTeamModal, Dropdown, Table } from '@screens/Teams/components'
import { Button, Search, Typography } from '@shared'
import { classnames } from '@utils'

import { modalAtom, ShowModal } from './components/Modals/Modal.atom'
import { teamsTableAtom } from './components/Table/Table.atom'
import { useGetTeamsQuery } from './utils/api/hooks'
import { SORT_TEAMS } from './const'
import { roleAtom } from './Teams.atom'
import styles from './Teams.module.css'

const Teams = () => {
  const setTeams = useSetRecoilState(teamsTableAtom)
  const { data, isSuccess, isLoading } = useGetTeamsQuery()
  const [showModal, setShowModal] = useRecoilState<ShowModal>(modalAtom)
  const modalRef = useRef<HTMLDivElement>(null)
  const role = useRecoilValue(roleAtom)

  const stylesCreatingTeam = classnames(styles.creating_team, {
    [styles.creating_team_lead]: role.isMember
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
    if (isSuccess) setTeams(data.data.teams)
  }, [isLoading])

  return (
    <>
      <div className={styles.container}>
        <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
          Рейтинг команд
        </Typography>
        <div className={styles.main}>
          <div className={stylesCreatingTeam}>
            <Search isLead={role.isMember} />
            {role.isMember && (
              <Button className={styles.button} onClick={handleClick}>
                Создать команду
              </Button>
            )}
          </div>
          <div className={styles.sorting}>
            <Typography tag='h4' variant='text_16_r'>
              Сортировать по
            </Typography>
            <Dropdown options={SORT_TEAMS} />
          </div>
          <Table ref={modalRef} />
        </div>
        {showModal.showCreatingTeam && <CreatingTeamModal ref={modalRef} />}
      </div>
    </>
  )
}

export default Teams
