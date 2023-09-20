import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { ref } from 'vue'
import firebase from 'firebase/compat/app'

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
setPersistence(auth, browserLocalPersistence) // Keep track of logged in user in the browser

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

const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        firebaseUser.value = userCredential.user
        updateProfile(firebaseUser.value, { displayName: name })
        resolve(userCredential.user)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const resetPassword = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

const restoreUser = async (): Promise<User | null> => {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        firebaseUser.value = user
        resolve(user)
      } else {
        firebaseUser.value = null
        resolve(null)
      }
    })
  })
}

const logout = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        firebaseUser.value = null
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

// '() => ' is een functie
export default () => {
  // State for each composable
  return {
    firebaseUser,

    login,
    logout,
    register,
    resetPassword,
    restoreUser,
  }
}
