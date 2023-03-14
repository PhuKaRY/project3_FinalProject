import React from "react";
import img23 from "../pictures/cedric.png";
import img45 from "../pictures/phu.png";

const About = () => {
  return (
    <>
      <h1 style={{ marginRight: "793px" }}>About Us</h1>
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
          <h2 style={{ color: "white", fontSize: "34px" }}>Cedric</h2>
          <img src={img23} alt="cedric" style={{ height: " 300px" }} />
          <p style={{ color: "beige", fontSize: "24px" }}>
            Fullstack developer student at IronHack
          </p>
        </div>
        <div>
          <h2 style={{ color: "white", fontSize: "34px" }}>Phu</h2>
          <img src={img45} alt="phu" style={{ height: " 300px" }} />
          <p style={{ color: "beige", fontSize: "24px" }}>
            Fullstack developer student at IronHack
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
