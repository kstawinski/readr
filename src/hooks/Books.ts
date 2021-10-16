import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'

export const Books = {
  getAllBooks: (uid: string) => new Promise((resolve, reject) => {
    console.log(uid)
    const booksRef = query(collection(db, 'books'), where('uid', '==', uid))

    return getDocs(booksRef).then(qSnap => {
      return resolve(
        qSnap.docs.map(d => ({ id: d.id, ...d.data() }))
      )
    })
  })
}