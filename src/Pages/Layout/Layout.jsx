import React, { useContext, useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../pictures/logoBike.png";

const Layout = () => {
  const { user, removeToken, authenticateUser } = useContext(AuthContext);
  const [showMenu, setMenu] = useState(false);

  // console.log(user);
  const handleClick = () => {
    setMenu(false)
    removeToken();
    authenticateUser();
  };
  return (
    <>
      <header
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#f1b459",
          height: "9vh",
        }}
      >
        {!showMenu ? (
          <picture
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: '.6vw'
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ height: "80px" }}
              onClick={() => setMenu(true)}
            />
          </picture>
        ) : (
          <div
            style={{
              position: "fixed",
              flexDirection: "column",
              display: "flex",
              top: "0",
              left: "0",
            }}
          >
            <button
              style={{ backgroundColor: "beige" }}
              onClick={() => setMenu(false)}
            >
              X
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f1b459",
                width: "15vw",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  gap: "10vh",
                }}
              >
                <li>
                  <NavLink onClick={()=> setMenu(false)} to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink onClick={()=> setMenu(false)} to={"/AllProducts"}>All Products</NavLink>
                </li>
                {!user ? (
                  <>
                    <li>
                      <NavLink onClick={()=> setMenu(false)} to={"/signup"}>Sign Up</NavLink>
                    </li>
                    <li>
                      <NavLink onClick={()=> setMenu(false)} to={"/login"}>Log In</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={handleClick}>Logout</li>
                    <li>
                      <NavLink onClick={()=> setMenu(false)} to={"/Profile"}>Profile</NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink to={"/about"}>About Us</NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}
        <h1 style={{ paddingLeft: "40vw" }}>Bike Swap</h1>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
