const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// for stripe payment gateway
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// for coinbase commerce payment gateway
const axios = require('axios');

router.post('/stripe', asyncHandler(async (req, res) => {
  console.log('POST /payment/stripe - Request received');
  try {
    const { email, name, address, amount, currency, description } = req.body;

    const customer = await stripe.customers.create({
      email: email,
      name: name,
      address: address,
    });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      description: description,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_PUBLIC_KEY,
    });
    console.log('POST /payment/stripe - Response sent');
  } catch (error) {
    console.log(error);
    return res.json({ error: true, message: error.message, data: null });
  }
}));

router.post('/coinbase', asyncHandler(async (req, res) => {
  console.log('POST /payment/coinbase - Request received');
  try {
    const { amount, currency, description } = req.body;

    const response = await axios.post('https://api.commerce.coinbase.com/charges', {
      name: 'Order Payment',
      description: description,
      pricing_type: 'fixed_price',
      local_price: {
        amount: amount.toString(),
        currency: currency,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': process.env.COINBASE_API_KEY,
        'X-CC-Version': '2018-03-22',
      },
    });

    if (response.status === 201) {
      res.json(response.data);
    } else {
      throw new Error('Failed to create charge');
    }
  } catch (error) {
    console.error('POST /payment/coinbase - Error:', error.message);
    if (error.response && error.response.data && error.response.data.error) {
      res.status(500).json({ error: true, message: error.response.data.error.message, data: null });
    } else {
      res.status(500).json({ error: true, message: error.message, data: null });
    }
  }
}));

module.exports = router;
