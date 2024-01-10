import Stripe from 'stripe';
import 'dotenv/config'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res, next)=>{

    console.log("Heelo payment");
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