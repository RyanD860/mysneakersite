import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer">
      <div className="footerin">
        <h1>WE SELL J's is</h1>
        <h2>
          a student personal project completed during the Full-Stack web
          development course.{" "}
        </h2>
        <h2> NO SNEAKERS ARE FOR SALE!!!!</h2>
        <h2> All images and products are owned by Nike.</h2>
        <h4>Made By: Ryan Daniels</h4>
        <a target="_blank" href="https://github.com/RyanD860">
          <img
            src={process.env.PUBLIC_URL + "github-512.png"}
            alt="github"
            id="github"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
