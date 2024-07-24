import { TeamScore } from '@screens/ActiveGame/ActiveGame'
import { Typography } from '@shared'

import styles from './TeamList.module.css'

interface TeamListProps {
  teamList: TeamInGame[]
  teamScore: TeamScore
}

export const TeamList = ({ teamList, teamScore }: TeamListProps) => {
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
        {teamList.length > 0 ? (
          teamList.map((team, index) => (
            <div key={team.team_id} className={styles.team_entry}>
              <Typography tag='div' variant='text_16_m'>
                {index + 1}
              </Typography>
              <Typography
                tag='div'
                variant='text_16_m'
                className='ml-8 overflow-hidden text-ellipsis text-start'
              >
                {team.team_name}
              </Typography>
              <Typography tag='div' variant='text_16_m'>
                {teamScore.scores[team.team_id]}
              </Typography>
            </div>
          ))
        ) : (
          <div>
            <Typography variant='text_24_b'>Нет команд</Typography>
          </div>
        )}
      </div>
    </div>
  )
}
