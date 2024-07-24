export function addTimeOffset(time: string, offset: string) {
  // Разделение времени и смещения на часы и минуты
  const [timeHours, timeMinutes] = time.split(':').map(Number)
  const [offsetHours, offsetMinutes] = offset.split(':').map(Number)

  // Преобразование в минуты
  const totalMinutes = timeHours * 60 + timeMinutes + (offsetHours * 60 + offsetMinutes)

  // Преобразование обратно в часы и минуты
  const resultHours = Math.floor(totalMinutes / 60) % 24 // Используем % 24 для корректной обработки перехода через полночь
  const resultMinutes = totalMinutes % 60

  // Форматирование результата
  const formattedHours = resultHours.toString().padStart(2, '0')
  const formattedMinutes = resultMinutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}
