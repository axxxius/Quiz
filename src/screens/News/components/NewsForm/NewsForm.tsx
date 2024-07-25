import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import CloseIcon from '@assets/icons/close.svg?react'
import ImageIcon from '@assets/icons/photo.svg?react'
import { Button, Input, Modal2, Typography } from '@shared'
import { usePostNewsMutation } from '@utils'

export interface PostNewsParams {
  title: string
  description: string
  image: FileList
}

interface NewsFormProps {
  visible: boolean
  onClose: () => void
}

export const NewsForm = ({ visible, onClose }: NewsFormProps) => {
  const { register, handleSubmit, setValue } = useForm<PostNewsParams>({ mode: 'onSubmit' })
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { mutate: createNews } = usePostNewsMutation({
    options: {
      onSuccess: () => {
        onClose()
      }
    }
  })

  const onSubmit = (data: PostNewsParams) => {
    const formData = new FormData()
    formData.append('image', data.image[0])
    formData.append('title', data.title)
    formData.append('description', data.description)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    createNews({ params: formData })
  }

  const handleImageChange = () => {
    if (imageInputRef.current?.files) {
      setValue('image', imageInputRef.current.files)
    }
  }

  return (
    <div>
      <Modal2 onClose={onClose} visible={visible}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb- mb-[24px] flex justify-between'>
            <Typography variant='text_32_b'>Добавить новость</Typography>
            <CloseIcon className='cursor-pointer' onClick={onClose} />
          </div>
          <Input className='mb-[16px] w-[454px]' label='Название' {...register('title')} />
          <Input className='mb-[16px]' label='Описание' {...register('description')} />
          <div className='mb-[34px] flex cursor-pointer gap-[10px]'>
            <label htmlFor='imageInput' className='flex cursor-pointer items-center gap-[10px]'>
              <Typography>Выбрать изображение</Typography>
              <ImageIcon />
            </label>
            <input
              type='file'
              id='imageInput'
              ref={imageInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <div className='w-[125px]'>
            <Button type='submit' variant='primary'>
              Добавить
            </Button>
          </div>
        </form>
      </Modal2>
    </div>
  )
}
