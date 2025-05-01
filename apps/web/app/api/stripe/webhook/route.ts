import { SERVER_ENV } from 'app/env/server-env'
import { getStripe } from '../stripe'

export async function POST(req: Request) {
  let data
  let eventType
  const stripe = getStripe()
  // Check if webhook signing is configured.
  const webhookSecret = SERVER_ENV.STRIPE_WEBHOOK_SECRET
  let event:
    | Awaited<ReturnType<typeof stripe.webhooks.constructEvent>>
    | undefined

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let signature = req.headers.get('stripe-signature')

    if (!signature) {
      return new Response('No signature', { status: 400 })
    }

    try {
      event = stripe.webhooks.constructEvent(
        await req.text(),
        signature,
        webhookSecret
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      return new Response('Webhook signature verification failed.', {
        status: 400,
      })
    }
    // Extract the object from the event.
    data = event.data
    eventType = event.type
  } else {
    return new Response(
      'Webhook secret not configured. Please see https://docs.stripe.com/mobile/digital-goods?lang=node&shell=true&api=true#webhooks',
      { status: 400 }
    )
  }

  if (!event) {
    return new Response('No event', { status: 400 })
  }

  switch (eventType) {
    case 'checkout.session.completed':
      const session = event.data.object
      //   const user = myUserDB.userForStripeCustomerID(session.customer)
      //   user.addCoinsTransaction(100, session.id)
      break
    default:
    // Unhandled event type
  }

  return new Response('OK', { status: 200 })
}
