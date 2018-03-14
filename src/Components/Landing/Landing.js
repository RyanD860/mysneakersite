import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div id="landing">
        <div id="landingtop">
          <img
            src="http://www.tokkoro.com/picsup/2808402-nba-michael-jordan-basketball-slam-dunk-chicago-bulls-nike-air-jordan___sports-wallpapers.jpg"
            alt="Jordan Landing"
            className="landingtoppic"
          />
          <div className="landingtopInfo">
            <h2>Welcome to</h2>
            <h1>We Sell J's</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
