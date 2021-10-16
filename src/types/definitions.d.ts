interface Book {
  id: string
  uid: string
  isbn: number
  title: string
  author: string
  thumbnail: string
  addDate: string
  collections?: Array<string>
  isReaded?: boolean
  lastModifiedDate?: string
  pages?: number
  publishedAt?: number
  rate?: number
  description?: string
}

interface Collection {
  id: string
  uid: string
  name: string
  lastModifiedDate?: string
}

type BooksArray = Array<Book>