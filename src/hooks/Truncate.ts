export const Truncate = (text: string, wordsLimit: number) => {
  if (text && wordsLimit) {
    let wordsArray = text.split(' ')

    if (wordsArray.length > wordsLimit) {
      wordsArray.length = wordsLimit
      return `${wordsArray.join(' ')}...`
    } else {
      return text
    }
  }
}