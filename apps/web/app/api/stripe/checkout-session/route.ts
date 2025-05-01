import { SERVER_ENV } from 'app/env/server-env'
import { PUBLIC_ENV } from 'app/env/public-env'
import { getStripe } from '../stripe'

export async function POST(req: Request) {
  // 👋 in production, you should associate this request with a customer
  // by authenticating the user here
  // const user = myUserDB.getUserFromToken(req.query.token)
  // const customerId = user.stripeCustomerID

  const priceId = SERVER_ENV.STRIPE_PRICE_ID
  const stripe = getStripe()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    // customer: customerId,
    success_url: `https://${PUBLIC_ENV.APP_URL}/checkout_redirect/success`,
    cancel_url: `https://${PUBLIC_ENV.APP_URL}/checkout_redirect/cancel`,
  })

  return Response.json({ url: session.url })
}
