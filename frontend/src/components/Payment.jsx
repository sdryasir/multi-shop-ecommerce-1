import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import {
  PaymentElement,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useProcessPaymentMutation } from '../redux/features/payment/paymentApi';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const [processPayment,  {isLoading, error, data}] = useProcessPaymentMutation()
  
  let subTotal = 0;
    for (let c in cart) {
        subTotal += cart[c].price * cart[c].quantity;
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await processPayment({amount:subTotal});
      const client_secret = res.data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret.client_secret, {
        payment_method:{
          card:elements.getElement(CardNumberElement),
          billing_details:{
            name:user.fullNmae,
            email:user.email
          }
        }
      });
      console.log("rrrrr", result.paymentIntent.status);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit} className='w-50'>
            <CardNumberElement type="text" className="form-control mb-3" />
            <CardExpiryElement type="text" className="form-control mb-3"  />
            <CardCvcElement type="text" className="form-control mb-3"  />
            <button className='btn btn-primary' type='submit'>Pay Now</button>
        </form>
    </div>
  )
}

export default Payment