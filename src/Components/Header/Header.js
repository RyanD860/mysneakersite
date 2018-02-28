import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOut } from "./../../ducks/reducer";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    this.secondLog = this.secondLog.bind(this);
  }

  secondLog() {
    axios.get("/api/logout").then(response => {
      return response;
    });
  }
  render() {
    return (
      <div>
        <header>
          <img
            src="https://cdn.shopify.com/tools/logo-maker/show/S3k4c1R2UjR2SzlzYkVjMWVWdW5LUT09LS14OGhTL1hoZHdKS21WYllsd3N6bUhBPT0=--239dfaa484a520bbdec68b0d7b57ef71c054dd39_1000x.svg.png"
            alt="Website Logo"
          />
          <nav>
            <Link to="/">
              <nav>HOME</nav>
            </Link>
            <Link to="/cart">
              <nav>CART</nav>
            </Link>
            {this.props.user[0] ? (
              <Link to={`/user/profile/${this.props.user[0].authid}`}>
                <nav>Profile</nav>
              </Link>
            ) : (
              <a href={"http://localhost:3001/login"}>Log In</a>
            )}
          </nav>
          {this.props.loggedIn ? (
            <Link to="/">
              <button onClick={() => this.props.logOut()}>Log Out</button>
            </Link>
          ) : (
            false
          )}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { logOut })(Header));
