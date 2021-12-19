const express = require('express');
const Stripe = require('stripe');
const SECRET_KEY = require('./config');

const stripe = new Stripe(SECRET_KEY);

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const payment = await stripe.paymentIntents.create({
    amount: 3000,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: payment.client_secret,
  });
});

app.listen(8000, () => console.log('server is running'));
