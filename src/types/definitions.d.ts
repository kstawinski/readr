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
  text: string
  lastModifiedDate?: string
}

interface SortingOptions {
  sortingMethod: string
  showOnlyReaded: boolean
}

type BooksArray = Array<Book>
type CollectionsArray = Array<Collection>