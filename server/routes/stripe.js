require("dotenv").config();
const express = require("express");
const router = express.Router();
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const STRIPE_SECRETKEY = process.env.STRIPE_SECRETKEY;
const stripe = require("stripe")(STRIPE_SECRETKEY);

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = "whsec_Nc8lZAOCsS35Q5ELpEX82wsaVfTyoGEA";

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
};

router.post("/webhook", (request, response) => {
  const payload = request.body;
  // used to verify that the request came from stripe
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = event.data.metadata;
    console.log(metadata);

    // Fulfill the purchase...
    fulfillOrder(session);
  }

  response.status(200);
});

module.exports = router;
