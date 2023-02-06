import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51MOH8zSB0s2EMORR1S7r29neT4EL162r7P5EmVbS71UAcHp55KqfBGfT0b5JbJdHKUuLlhlcNtfvO7mLOLb9lmQW00OSfFmdcL";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;