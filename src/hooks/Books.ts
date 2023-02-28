import { db } from '../firebase'
import { collection, getDocs, where, query, doc, deleteDoc } from 'firebase/firestore'
import { Store } from './Store'
import axios from 'axios'

const UID = Store.getItem('uid')

export const Books = {
  // getAllBooks: () => new Promise((resolve: (value: BooksArray) => void, reject) => {
  //   const booksRef = query(
  //     collection(db, 'books'),
  //     where('uid', '==', UID)
  //   )

  //   getDocs(booksRef)
  //     .then(qSnap => {
  //       const booksArray: BooksArray = qSnap.docs.map(d => (<Book>{ id: d.id, ...d.data() }))
  //       resolve(booksArray)
  //     })
  //     .catch(error => {
  //       reject(error)
  //     })
  // }),
  getAllBooks: () => new Promise((resolve: (value: BooksArray) => void, reject) => {
    const API_URL = 'https://api.readr.fun'
    axios.get(`${API_URL}/books/${UID}`)
      .then((response) => {
        console.log(response.data);
        resolve(response.data as BooksArray);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      // .finally(() => {
      //   // always executed
      // });
  }),

  delete: async (id: string) => await deleteDoc(doc(db, 'books', id))
}