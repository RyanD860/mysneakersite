import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const CURRENCY = "USD";

const fromDollarsToCent = amount => amount * 100;

const onToken = (
  amount,
  description,
  customer,
  addtoCart,
  cart,
  user,
  auth,
  phone,
  name,
  address,
  checked
) => token =>
  axios
    .post("/charge", {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarsToCent(amount),
      customer: customer
    })
    .then(addtoCart(cart, user, auth))
    .then(axios.get(`/text/${name}/${phone}/${address}`))
    .then(checked());

const Checkout = ({
  name,
  description,
  amount,
  customer,
  addtoCart,
  cart,
  user,
  auth,
  phone,
  address,
  email,
  checked
}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarsToCent(amount)}
    token={onToken(
      amount,
      description,
      customer,
      addtoCart,
      cart,
      user,
      auth,
      phone,
      name,
      address,
      checked
    )}
    currency={CURRENCY}
    stripeKey={"pk_test_SsXYSIBwiqR4e2KFXmaEU69G"}
    customer={customer}
    addtoCart={addtoCart}
    cart={cart}
    user={user}
    auth={auth}
    phone={phone}
    address={address}
    email={email}
  />
);

export default Checkout;
