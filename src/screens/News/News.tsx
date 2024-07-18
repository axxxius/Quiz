import { CardList } from '@screens/News/components/CardList/CardList.tsx'
import { Button, Search, Typography } from '@shared'

import styles from './News.module.css'

const news = [
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  },
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  },
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  },
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  },
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  },
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  },
  {
    title: 'Тестирование',
    description: 'подробная информация о карточке'
  }
]

const News = () => {
  return (
    <div className={styles.container}>
      <div className='mb-[26px] flex justify-between'>
        <Typography tag='h1' variant='text_36_b'>
          Анонсы и новости
        </Typography>
        <Button variant='secondary_regular' className={styles.button}>
          Создать анонс
        </Button>
      </div>
      <Search isLead={true} />
      <CardList news={news} />
    </div>
  )
}

export default News
