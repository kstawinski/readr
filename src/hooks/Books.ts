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

    getDocs(booksRef)
      .then(qSnap => {
        const booksArray: BooksArray = qSnap.docs.map(d => (<Book>{ id: d.id, ...d.data() }))
        resolve(booksArray)
      })
      .catch(error => {
        reject(error)
      })
  })
}