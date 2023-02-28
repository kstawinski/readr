import { db } from '../firebase'
import { collection, getDocs, where, query, addDoc } from 'firebase/firestore'
import { Store } from './Store'
import axios from 'axios'

const UID = Store.getItem('uid')
const API_URL = 'https://api.readr.fun'

export const Collections = {
  getAll: () => new Promise((resolve: (value: CollectionsArray) => void, reject) => {
    axios.get(`${API_URL}/collections/${UID}`)
      .then((response) => {
        console.log(response.data);
        resolve(response.data as CollectionsArray);
      })
      .catch((error) => {
        console.log(error);
      })
  }),

  create: (collectionName: string) => new Promise((resolve: (value: boolean) => void, reject) => {
    axios.post(`${API_URL}/collections/${UID}`, {
      title: collectionName
    })
      .then((response) => {
        console.log(response.data);
        resolve(true)
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
  })
}