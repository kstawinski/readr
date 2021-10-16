import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { Store } from '../hooks/Store'

export const Auth = {
  signInUsingGoogle: () => new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then(response => response.user)
      .then(credentials => {
        resolve(credentials)
      })
      .catch(error => {
        reject(error)
      })
  }),

  isLoggedIn: () => Store.getItem('uid') !== null
}