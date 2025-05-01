import { SERVER_ENV } from 'app/env/server-env'
import Stripe from 'stripe'

export const stripe = new Stripe(SERVER_ENV.STRIPE_SECRET_KEY)
