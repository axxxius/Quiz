import { TeamInGame } from '@screens/ActiveGame/ActiveGame'
import { Typography } from '@shared'
import styles from './TeamList.module.css'

interface TeamListProps {
  teamList: TeamInGame[]
}

const TeamList = ({ teamList }: TeamListProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.game_header}>
        <Typography tag='div' variant='text_16_b'>
          Место
        </Typography>
        <Typography tag='div' variant='text_16_b' className='ml-8 text-start'>
          Команда
        </Typography>
        <Typography tag='div' variant='text_16_b'>
          Баллы
        </Typography>
      </ul>
      <div className={styles.teams_list}>
        {teamList.map((team, index) => (
          <div key={team.id} className={styles.team_entry}>
            <Typography tag='div' variant='text_16_m'>
              {index + 1}
            </Typography>
            <Typography
              tag='div'
              variant='text_16_m'
              className='ml-8 overflow-hidden text-ellipsis text-start'
            >
              {team.name}
            </Typography>
            <Typography tag='div' variant='text_16_m'>
              {team.points}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamList
