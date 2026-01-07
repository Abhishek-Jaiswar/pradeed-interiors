import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function createPaymentIntent(amount: number, currency: string = 'inr', metadata: any = {}) {
  return await stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
  });
}

export async function retrievePaymentIntent(id: string) {
  return await stripe.paymentIntents.retrieve(id);
}

export async function createCheckoutSession(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], successUrl: string, cancelUrl: string, metadata: any = {}) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
}

export default stripe;
