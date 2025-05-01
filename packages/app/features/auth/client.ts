import { getApp } from 'firebase/app'
import { getAuth, signInAnonymously, onIdTokenChanged } from 'firebase/auth'

const app = getApp()
const auth = getAuth(app)

export const clientAuth = {
  signInAnonymously: async () => {
    const credential = await signInAnonymously(auth)
    return credential.user
  },
  onIdTokenChanged: (callback: (user: null | { uid: string }) => void) => {
    onIdTokenChanged(auth, callback)
  },
  getToken: async () => {
    const user = auth.currentUser
    if (!user) return null
    const token = await user.getIdToken()
    return token
  },
}
