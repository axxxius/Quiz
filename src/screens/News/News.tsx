import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { useRole } from '@hooks'
import { authAtom } from '@screens/Auth/Auth.atom.ts'
import { NewsForm } from '@screens/News/components'
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
  const [visible, setVisible] = useState(false)
  const authState = useRecoilValue(authAtom)
  console.log('@@@newsAuth', authState)

  const { role } = useRole()
  console.log('@@@decode', role)

  return (
    <div className={styles.container}>
      <div className='mb-[26px] flex justify-between'>
        <Typography tag='h1' variant='text_36_b'>
          Анонсы и новости
        </Typography>
        <Button
          onClick={() => setVisible(true)}
          variant='secondary_regular'
          className={styles.button}
        >
          Создать анонс
        </Button>
      </div>
      <Search />
      <CardList news={news} />
      <NewsForm visible={visible} onClose={() => setVisible(false)} />
    </div>
  )
}

export default News
