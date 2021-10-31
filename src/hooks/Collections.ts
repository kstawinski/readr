import { db } from '../firebase'
import { collection, getDocs, where, query, addDoc } from 'firebase/firestore'
import { Store } from './Store'

const UID = Store.getItem('uid')

export const Collections = {
  getAll: () => new Promise((resolve: (value: CollectionsArray) => void, reject) => {
    const collectionsRef = query(
      collection(db, 'collections'),
      where('uid', '==', UID)
    )

    getDocs(collectionsRef)
      .then(qSnap => {
        const collectionsArray: CollectionsArray = qSnap.docs.map(d => (<Collection>{ id: d.id, ...d.data() }))
        resolve(collectionsArray)
      })
      .catch(error => {
        reject(error)
      })
  }),

  create: (name: string) => new Promise((resolve: (value: boolean) => void, reject) => {
    addDoc(collection(db, 'collections'), {
      text: name,
      uid: UID
    })
      .then(() => resolve(true))
      .catch(error => reject(error))
  })
}