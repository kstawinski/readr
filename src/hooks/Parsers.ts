export const Parsers = {
  parseTitle: (fullTitle: string) => (
    (fullTitle.match(/(.+) \//) as Array<string>)
    [1] as string
  ),

  parseAuthor: (fullAuthor: string) =>
    `${fullAuthor.split(' ')[1]} ${fullAuthor.split(' ')[0]}`
    .replace(/,/, '')
}
