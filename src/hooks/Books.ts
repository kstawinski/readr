import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { Store } from './Store'

const UID = Store.getItem('uid')

export const Books = {
  getAllBooks: () => new Promise((resolve: (value: BooksArray) => void, reject) => {
    const booksRef = query(
      collection(db, 'books'),
      where('uid', '==', UID)
    )

    getDocs(booksRef).then(qSnap => {
      const booksArray: BooksArray = qSnap.docs.map(d => (<Book>{ id: d.id, ...d.data() }))
      resolve(booksArray)
    })
  }),

  getBook: (id: string) => new Promise((resolve: (value: Book) => void, reject) => {
    Books.getAllBooks()
      .then(books => {
        resolve(
          books.filter(book => book.id === id)[0]
        )
      })
  })
}