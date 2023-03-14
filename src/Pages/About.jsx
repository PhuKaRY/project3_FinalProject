import React from "react";
import img23 from "../pictures/cedric.png";
import img45 from "../pictures/phu.png";

const About = () => {
  return (
    <>
      <h1>About Us</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20vh",
          letterSpacing: "1px ",
          gap: "5vw",
        }}
      >
        <div>
          <h2>Cedric</h2>
          <img src={img23} alt="cedric" style={{ height: " 300px" }} />
          <p style={{ color: "white" }}>
            Fullstack developer student at IronHack
          </p>
        </div>
        <div>
          <h2>Phu</h2>
          <img src={img45} alt="phu" style={{ height: " 300px" }} />
          <p style={{ color: "white" }}>
            Fullstack developer student at IronHack
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
