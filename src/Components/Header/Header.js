import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOut, checkForUser, getCart } from "./../../ducks/reducer";
import axios from "axios";
import "./Header.css";

class Header extends Component {
  constructor() {
    super();
    this.secondLog = this.secondLog.bind(this);
  }

  componentDidMount() {
    this.props.checkForUser();
    this.props.getCart();
  }

  secondLog() {
    axios.get("/api/logout").then(response => {
      return response;
    });
  }
  render() {
    return (
      <div id="sticky">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <header>
          <Link to="/" style={{ textDecoration: "none", borderBottom: "none" }}>
            <img
              src="https://cdn.shopify.com/tools/logo-maker/show/S3k4c1R2UjR2SzlzYkVjMWVWdW5LUT09LS14OGhTL1hoZHdKS21WYllsd3N6bUhBPT0=--239dfaa484a520bbdec68b0d7b57ef71c054dd39_1000x.svg.png"
              alt="Website Logo"
              id="logo"
            />
          </Link>
          <nav>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                borderBottom: "none",
                fontFamily: "Cantarell"
              }}
            >
              <nav>Sneakers</nav>
            </Link>
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                borderBottom: "none",
                fontFamily: "Cantarell"
              }}
            >
              <nav>
                {this.props.cart.cart
                  ? `(${this.props.cart.cart.length})`
                  : "(0)"}
                <i className="material-icons">shopping_cart</i>
              </nav>
            </Link>
            {this.props.user[0] ? (
              <Link
                to={`/user/profile/${this.props.user[0].authid}`}
                style={{
                  textDecoration: "none",
                  borderBottom: "none",
                  fontFamily: "Cantarell"
                }}
              >
                <nav>Profile</nav>
              </Link>
            ) : (
              <a
                style={{
                  textDecoration: "none",
                  borderBottom: "none",
                  fontFamily: "Cantarell"
                }}
                href={process.env.REACT_APP_LOGIN}
              >
                Log In
              </a>
            )}

            {this.props.user[0] ? (
              <Link
                to="/"
                style={{ textDecoration: "none", borderBottom: "none" }}
              >
                <button className="log" onClick={() => this.props.logOut()}>
                  Log Out
                </button>
              </Link>
            ) : (
              false
            )}
          </nav>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { logOut, checkForUser, getCart })(Header)
);
