import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
const config = process.env.FIREBASE_CONFIG

const app = initializeApp()

const firebaseAuth = getAuth(app)

export const serverAuth = {
  verifyToken: async (token: string) => {
    const decodedToken = await firebaseAuth.verifyIdToken(token)
    return decodedToken
  },
}
