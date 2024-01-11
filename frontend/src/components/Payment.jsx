import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

function Payment() {
  const [apiSecret, setApiSecret] = useState('')
  const getStripeApi = async ()=>{
    await fetch('http://localhost:8000/api/stripeapikey')
    .then(res=>res.json())
    .then(data=>setApiSecret(data.stripe_api_key));
  }


  useEffect(()=>{
    getStripeApi();
  },[])

  const stripePromise = loadStripe('pk_test_51JXUPNLs3WLhYCTdb6263j1MdZgKdGAIcneTvUokHLpJl4d5dsVdRQ5AxyIKdnAeI2vA8pPOddH5s5rFkZ2x78ZS008FJnKsVC');
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiSecret,
  };
  return (
    <div>
        <Elements stripe={stripePromise}>
            <CardNumberElement/>
            <CardExpiryElement/>
            <CardCvcElement/>
        </Elements>
    </div>
  )
}

export default Payment