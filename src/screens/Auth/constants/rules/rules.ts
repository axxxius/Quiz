const maxLength = (length: number) => ({
  value: length,
  message: `Максимальная длина равна ${length}`
})

const minLength = (length: number) => ({
  value: length,
  message: `Минимальная длина равна ${length}`
})

const patterEmail = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Введите действительный адрес электронной почты'
}

const required = { value: true, message: 'Поле обязательно к заполнению' }

export const rules = {
  maxLength,
  minLength,
  patterEmail,
  required
}
