import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart, checkout } from "./../../ducks/reducer";
import { Link } from "react-router-dom";
import Checkout from "./checkout";

class Cart extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {console.log(this.props)}
        {this.props.cart.total
          ? this.props.cart.cart.map((item, i) => {
              return (
                <div key={i}>
                  <img
                    src={process.env.PUBLIC_URL + item[0].mainimage}
                    alt="item in cart"
                  />
                  <h1>{item[0].name}</h1>
                  <h2>size: {item[0].size}</h2>
                  <h2>price: {item[0].price}</h2>
                  <button
                    onClick={() => this.props.removeFromCart(i, item[0].price)}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          : "No items in cart"}
        {this.props.cart.total && this.props.loggedIn ? (
          <div>
            <h1>Cart total : {this.props.cart.total}</h1>
            <Link to="/" />
            <Link
              to={`/user/profile/${this.props.user[0].authid}`}
              onClick={() =>
                this.props.checkout(
                  this.props.cart.cart,
                  this.props.user[0].userid
                )
              }
            >
              {" "}
              <Checkout
                name={`${this.props.user[0].firstname} ${
                  this.props.user[0].lastname
                }`}
                description={"Sneakers"}
                amount={this.props.cart.total}
                customer={this.props.user[0].authid}
              />
            </Link>
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { removeFromCart, checkout })(Cart)
);
