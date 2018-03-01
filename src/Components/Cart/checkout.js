import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const CURRENCY = "USD";

const fromDollarsToCent = amount => amount * 100;

const onToken = (amount, description, customer) => token =>
  axios.post("/charge", {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: fromDollarsToCent(amount),
    customer: customer
  });

const Checkout = ({ name, description, amount, customer }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarsToCent(amount)}
    token={onToken(amount, description, customer)}
    currency={CURRENCY}
    stripeKey={"pk_test_SsXYSIBwiqR4e2KFXmaEU69G"}
    customer={customer}
  />
);

export default Checkout;
