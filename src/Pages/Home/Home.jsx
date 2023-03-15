import React, { useState, useEffect } from "react";
import ListProduct from "../../components/ListProduct";
import myApi from "../../service/service";
import Vdbr from "../../video/vdbr.mp4";

const Home = () => {
  return (
    <>
      <div className="videobg">
        <video autoPlay loop muted>
          <source src={Vdbr} type="video/mp4" />
        </video>
      </div>
      <div style={{height:'81vh'}}></div>
      <footer style={{backgroundColor:'beige', height:'5vh', width:'100vw', marginTop:'5vh', textAlign:'center'}}>&copy; by Cedric&Phu</footer>
    </>
  );
};

export default Home;
