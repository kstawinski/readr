import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'

export const Books = {
  getAllBooks: (uid: string) => new Promise((resolve, reject) => {
    const booksRef = query(
      collection(db, 'books'),
      where('uid', '==', uid)
    )

    getDocs(booksRef).then(qSnap => {
      const booksArray: BooksArray = qSnap.docs.map(d => (<Book>{ id: d.id, ...d.data() }))
      resolve(booksArray)
    })
  })
}