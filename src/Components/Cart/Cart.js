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
    return (
      <div className="cart">
        <div className="col">
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
                    <h2 className="title">{item[0].name}</h2>
                  </div>

                  <div className="cartinfo">
                    <h2 className="subtitle">size: {item[0].size}</h2>
                    <h2 className="subtitle">price: {item[0].price}</h2>
                    <button
                      onClick={() =>
                        this.props.removeFromCart(i, item[0].price)
                      }
                      className="remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="no">NO ITEMS IN CART</h1>
          )}
        </div>
        <div id="checkout">
          {this.props.cart.total ? (
            <div>
              <h1>Cart total : {this.props.cart.total}</h1>
            </div>
          ) : (
            <h1>Cart total : 0</h1>
          )}
          {this.props.loggedIn && this.props.cart.total ? (
            <div>
              <Checkout
                name={`${this.props.user[0].firstname} ${
                  this.props.user[0].lastname
                }`}
                description={"Sneakers"}
                amount={this.props.cart.total}
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
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { removeFromCart, checkout })(Cart)
);
