interface Book {
  id: string
  uid: string
  isbn: number
  title: string
  author: string
  isEbook?: boolean
  thumbnail: string
  addDate: Timestamp
  collections?: Array<string>
  isReaded?: boolean
  lastModifiedDate?: Timestamp
  pages?: number
  publishedAt?: number
  rate?: number
  description?: string
}

interface Timestamp {
  seconds: string
  nanoseconds: string
}

interface Collection {
  id: string
  uid: string
  text: string
  lastModifiedDate?: Timestamp
}

interface SortingOptions {
  method: 'title' | 'author' | 'ratingAsc' | 'ratingDes' | 'addAsc' | 'addDes' | 'editAsc' | 'editDes' | ''
  isRatingRequired: boolean
}

type BooksArray = Array<Book>
type CollectionsArray = Array<Collection>