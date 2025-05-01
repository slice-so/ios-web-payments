import { SERVER_ENV } from 'app/env/server-env'
import Stripe from 'stripe'

export const getStripe = () => {
  return new Stripe(SERVER_ENV.STRIPE_SECRET_KEY, {
    typescript: true,
  })
}
