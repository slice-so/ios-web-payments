const BUNDLE_IDENTIFIER =
  process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER ||
  process.env.NEXT_PUBLIC_BUNDLE_IDENTIFIER ||
  'com.solito.payments'

const APP_URL =
  process.env.EXPO_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'https://solito-payments.vercel.app'

export const PUBLIC_ENV = {
  APP_URL,
  BUNDLE_IDENTIFIER,
}

if (process.env.NODE_ENV === 'development') {
  PUBLIC_ENV.APP_URL = 'localhost:3000'
}
