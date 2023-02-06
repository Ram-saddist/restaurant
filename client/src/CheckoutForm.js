import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios'

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:5000/stripe/charge",
          {
            amount: 999,
            id: id,
          }
        );

        console.log("Stripe | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js | ", error);
      }
    } 
    else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};