import express from 'express';
import {createOrder} from '../controllers/payment.controller.js';

const paymentRoutes = express.Router();

paymentRoutes.post('/create-order', createOrder);

paymentRoutes.get('/success', (req, res) => {
    res.send('Payment successful!');
});

paymentRoutes.get('/failure', (req, res) => {
    res.send('Payment failed!');    
});

paymentRoutes.get('/pending', (req, res) => {
    res.send('Payment pending!');   
});


export default paymentRoutes;