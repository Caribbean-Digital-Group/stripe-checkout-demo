const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: "PLAN INTERNET DEMO 100 MB",
          },
          unit_amount: 2500,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      metadata: {
        description: 15093,
        reference: "111111C",
      },
      description: 15093,
    },
    mode: "payment",
    success_url: "http://localhost/projects/front-stripe/success.html",
    cancel_url: "http://localhost/projects/front-stripe/cancel.html",
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
