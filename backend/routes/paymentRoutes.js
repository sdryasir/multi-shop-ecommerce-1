import express from 'express';
const router = express.Router();
import { processPayment, sendStripeApi } from '../controllers/payment.comroller.js';

router.route('/payment').post(processPayment);
router.route('/stripeapikey').get(sendStripeApi);

export default router;
