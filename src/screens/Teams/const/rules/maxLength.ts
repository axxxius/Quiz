export const maxLength = (length: number, field: string) => ({
  value: length,
  message: `Максимальная длина поля ${field} равна ${length}`
})
