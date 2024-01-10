import express from 'express';
const router = express.Router();
import { processPayment } from '../controllers/payment.comroller.js';

router.route('/payment').post(processPayment);

export default router;
