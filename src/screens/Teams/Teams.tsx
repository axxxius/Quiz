import { useRef, useState } from 'react'

import { useOnClickOutside } from '@hooks'
import { CreatingTeamModal, Dropdown, Search, Table } from '@screens/Teams/components'
import { ShowModal } from '@screens/Teams/types'
import { Button, Typography } from '@shared'
import { classnames } from '@utils'

import { SORT_TEAMS } from './const'
import styles from './Teams.module.css'

const Teams = () => {
  const [showModal, setShowModal] = useState<ShowModal>({
    creatingTeam: false,
    team: false
  })

  const modalRef = useRef(null)
  const role = 'lead'
  const isLead = role == 'lead'

  const stylesCreatingTeam = classnames(styles.creating_team, {
    [styles.creating_team_lead]: isLead
  })

  const handleClick = () => {
    setShowModal((prev) => ({
      ...prev,
      creatingTeam: true
    }))
  }

  useOnClickOutside(modalRef, () =>
    setShowModal({
      creatingTeam: false,
      team: false
    })
  )

  return (
    <div>
      <Typography tag='h1' variant='text_36_b' className={styles.page_name}>
        Рейтинг команд
      </Typography>
      <div className={styles.main}>
        <div className={stylesCreatingTeam}>
          <Search isLead={isLead} />
          {isLead && (
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
        <Table showModal={showModal} setShowModal={setShowModal} ref={modalRef} />
      </div>
      {showModal.creatingTeam && <CreatingTeamModal ref={modalRef} setShowModal={setShowModal} />}
    </div>
  )
}

export default Teams
