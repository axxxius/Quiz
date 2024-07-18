export const minLength = (length: number, field: string) => ({
  value: length,
  message: `Минимальная длина поля ${field} равна ${length}`
})
