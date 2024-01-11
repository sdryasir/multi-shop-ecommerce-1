import Stripe from 'stripe';
import 'dotenv/config'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res, next)=>{

    const amount = req.body.amount;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        metadata: {
            integration_check: 'accept_a_payment',
        },
    });

  res.json({
    success:true,
    client_secret: paymentIntent
  })

}

export const sendStripeApi = async (req, res, next)=>{
    
  res.json({
    stripe_api_key: process.env.STRIPE_SECRET_KEY
  })
}