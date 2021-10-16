import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseApp = initializeApp({
  // Firebase config
})

export const auth = getAuth(firebaseApp)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(firebaseApp)
