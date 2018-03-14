import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart, checkout } from "./../../ducks/reducer";
import "./cart.css";
import Checkout from "./checkout";

class Cart extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    let toNumber = Number(this.props.cart.total).toFixed(2);
    let tax = Number(toNumber * 0.06).toFixed(2);
    let cartTotal = Number(this.props.cart.total * 1.06).toFixed(2);
    return (
      <div className="cart">
        <div className="col">
          <h1>Shopping Cart</h1>
          {this.props.cart.total ? (
            this.props.cart.cart.map((item, i) => {
              return (
                <div key={i} className="cartItem">
                  <div className="shoetitle">
                    <img
                      src={process.env.PUBLIC_URL + item[0].mainimage}
                      alt="item in cart"
                      className="cartImg"
                    />
                  </div>

                  <div className="cartinfo">
                    <p className="title">{item[0].name}</p>
                    <p className="subtitle">Size: {item[0].size}</p>
                    <p className="subtitle">SubTotal: {item[0].price}</p>
                  </div>
                  <button
                    onClick={() => this.props.removeFromCart(i, item[0].price)}
                    className="remove"
                  >
                    Remove
                  </button>
                </div>
              );
            })
          ) : (
            <h2 className="no">NO ITEMS IN CART</h2>
          )}
        </div>
        <div id="checkout">
          <h2>Cart</h2>
          {this.props.cart.total ? (
            <div id="total">
              <p>Cart subtotal: ${toNumber}</p>
              <p>Shipping: FREE </p>
              <p>Tax: ${tax}</p>
              <p>Cart total: {cartTotal}</p>
            </div>
          ) : (
            <h2>Cart total : 0</h2>
          )}
          {this.props.loggedIn && this.props.cart.total ? (
            <div>
              <Checkout
                name={`${this.props.user[0].firstname} ${
                  this.props.user[0].lastname
                }`}
                description={"Sneakers"}
                amount={cartTotal}
                customer={this.props.user[0].authid}
                addtoCart={this.props.checkout}
                cart={this.props.cart.cart}
                user={this.props.user[0].userid}
                auth={this.props.user[0].authid}
                id="checkout"
                phone={this.props.user[0].phone}
              />
            </div>
          ) : (
            false
          )}
        </div>
        {console.log({ cartTotal })}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { removeFromCart, checkout })(Cart)
);
