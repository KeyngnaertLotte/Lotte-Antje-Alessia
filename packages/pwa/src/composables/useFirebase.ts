import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, type User } from 'firebase/auth'
import { ref } from 'vue'

// shared state
// const variable = ref('Hi there')

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
})

const auth = getAuth(app)
const firebaseUser = ref<User | null>(auth.currentUser)

const login = async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          firebaseUser.value = userCredential.user
          resolve(userCredential.user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

// '() => ' is een functie
export default () => {
  // state for each composable

  return {
    login,
    firebaseUser,
  }
}
