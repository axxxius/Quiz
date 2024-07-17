export const required = (field: string) => ({
  value: true,
  message: `Поле ${field} обязательно для заполнения`
})
