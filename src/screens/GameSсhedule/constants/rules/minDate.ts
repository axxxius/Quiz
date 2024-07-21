export const minDate = () => {
  const today = new Date().toISOString().split('T')[0]

  return {
    value: today,
    message: 'Дата не может быть раньше текущей!'
  }
}
