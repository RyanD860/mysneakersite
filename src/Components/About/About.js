import React from "react";
import "./About.css";

const About = ({ goBack }) => {
  return (
    <div className="landingtopAbout">
      <h1>About Us</h1>
      <p style={{ lineHeight: "30px", fontSize: "20px" }}>
        We at We Sell J's know how important a fresh pair of kicks is. Michael
        Jordan blazed a path for people of all ages to feel "Like Mike" while on
        the court, or even when you're just hanging with a couple of pals. We
        hope to honor the legacy of the G.O.A.T by giving customers an easy path
        to searching for the best pair of Jordan's available.
      </p>
      <p
        style={{
          color: "#dddddd",
          fontSize: "27px",
          borderBottom: "solid 2px #dddddd",
          display: "inline",
          paddingBottom: "5px"
        }}
        onClick={() => goBack()}
        className="landLink"
      >
        {" "}
        GO BACK
      </p>
    </div>
  );
};

export default About;
