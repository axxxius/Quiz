export const maxLength = (length: number) => {
  let word = 'символов'
  if (length % 10 === 1 && length % 100 !== 11) {
    word = 'символ'
  } else if (length % 10 >= 2 && length % 10 <= 4 && (length % 100 < 10 || length % 100 >= 20)) {
    word = 'символа'
  }
  return {
    value: length,
    message: `Максимальная длинна - ${length} ${word}!`
  }
}
