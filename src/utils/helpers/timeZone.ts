export const timeZone = () => {
  // Получаем текущую дату
  const now = new Date()

  // Получаем смещение часового пояса в минутах
  const timezoneOffset = now.getTimezoneOffset()

  // Преобразуем смещение в часы и минуты
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60))
  const offsetMinutes = Math.abs(timezoneOffset % 60)

  // Формируем строку смещения, добавляя ведущие нули при необходимости
  const formattedOffset =
    (timezoneOffset > 0 ? '-' : '+') +
    (offsetHours < 10 ? '0' + offsetHours : offsetHours) +
    ':' +
    (offsetMinutes < 10 ? '0' + offsetMinutes : offsetMinutes)

  return formattedOffset
}
