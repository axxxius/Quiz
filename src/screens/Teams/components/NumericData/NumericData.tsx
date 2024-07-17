import styles from '@screens/Teams/components/NumericData/NumericData.module.css'
import { Typography } from '@shared'
import { classnames } from '@utils'

interface NumericDataProps {
  numberData: number
  name: string
  className: string
}

export const NumericData = ({ numberData, name, className }: NumericDataProps) => {
  const stylesContainer = classnames(styles.container, className)
  return (
    <div className={stylesContainer}>
      <Typography tag='div' variant='text_20_b'>
        {name}
      </Typography>
      <Typography tag='div' variant='text_32_b'>
        {numberData}
      </Typography>
    </div>
  )
}
