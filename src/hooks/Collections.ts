import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'
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
  })
}