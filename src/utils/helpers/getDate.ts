export const getDate = (date: string) => {
  const newDate = new Date(date)
  return `${newDate.getDate()}.${(newDate.getMonth() + 1).toString().padStart(2, '0')}.${newDate.getFullYear()}`
}
