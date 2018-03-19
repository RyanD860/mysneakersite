import React, { Component } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import About from "./../About/About";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOut } from "./../../ducks/reducer";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about: false
    };

    this.handleAbout = this.handleAbout.bind(this);
  }

  handleAbout() {
    this.setState({ about: !this.state.about });
  }

  render() {
    return (
      <div id="landing">
        <div id="landingtop">
          <img
            src="https://www.ceros.com/blog/wp-content/uploads/2017/01/JordanDunk.gif"
            alt="Jordan Landing"
            className="landingtoppic"
          />

          {this.state.about === false && !this.props.user[0] ? (
            <div className="landingtopInfo">
              <h2 style={{ fontSize: "3em", lineHeight: "60px" }}>
                Welcome to
              </h2>
              <h1 style={{ fontSize: "5em", lineHeight: "60px" }}>
                We Sell J's
              </h1>
              <div className="links">
                <Link to="/home">
                  <p
                    style={{
                      textDecoration: "none",
                      color: "#dddddd",
                      fontSize: "27px",
                      borderBottom: "solid 2px #dddddd",
                      display: "inline",
                      paddingBottom: "5px"
                    }}
                    href={"http://localhost:3000/home"}
                  >
                    SHOP{" "}
                  </p>
                </Link>

                <p
                  style={{
                    textDecoration: "none",
                    color: "#dddddd",
                    fontSize: "27px",
                    borderBottom: "solid 2px #dddddd",
                    display: "inline",
                    paddingBottom: "11.1px"
                  }}
                  href={"http://localhost:3000/about"}
                  onClick={() => this.handleAbout()}
                  className="landLink"
                >
                  ABOUT
                </p>
              </div>
              <br />

              <a
                style={{
                  color: "#dddddd",
                  fontSize: "27px",
                  borderBottom: "solid 2px #dddddd",
                  display: "inline",
                  paddingBottom: "5px"
                }}
                href={"http://localhost:3001/Login"}
                className="landLink"
              >
                LOG IN / SIGN UP
              </a>
            </div>
          ) : (
            <div className="landingtopInfo">
              <h2 style={{ fontSize: "3em", lineHeight: "60px" }}>
                Welcome to
              </h2>
              <h1 style={{ fontSize: "5em", lineHeight: "60px" }}>
                We Sell J's
              </h1>
              <div className="links">
                <Link to="/home">
                  <p
                    style={{
                      textDecoration: "none",
                      color: "#dddddd",
                      fontSize: "27px",
                      borderBottom: "solid 2px #dddddd",
                      display: "inline",
                      paddingBottom: "5px"
                    }}
                    href={"http://localhost:3000/home"}
                  >
                    SHOP{" "}
                  </p>
                </Link>

                <p
                  style={{
                    textDecoration: "none",
                    color: "#dddddd",
                    fontSize: "27px",
                    borderBottom: "solid 2px #dddddd",
                    display: "inline",
                    paddingBottom: "11.1px"
                  }}
                  href={"http://localhost:3000/about"}
                  onClick={() => this.handleAbout()}
                  className="landLink"
                >
                  ABOUT
                </p>
              </div>
              <br />

              <p
                style={{
                  color: "#dddddd",
                  fontSize: "27px",
                  borderBottom: "solid 2px #dddddd",
                  display: "inline",
                  paddingBottom: "5px",
                  cursor: "default"
                }}
              >
                Hello{" "}
                {this.props.user[0] ? this.props.user[0].firstname : false}!
              </p>
            </div>
          )}
          {this.state.about === true ? (
            <About goBack={this.handleAbout} />
          ) : (
            false
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { logOut })(Landing));
