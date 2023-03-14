import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Layout = () => {
  const { user, removeToken, authenticateUser } = useContext(AuthContext);
  const [showMenu, setMenu] = useState(false);

  // console.log(user);
  const handleClick = () => {
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
          backgroundColor: "black",
          height: "8vh",
        }}
      >
        {!showMenu ? (
          <button onClick={() => setMenu(true)}>=</button>
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
            <button onClick={() => setMenu(false)}>X</button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "black",
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
                  <Link to={"/"}>Home</Link>
                </li>
                {!user ? (
                  <>
                    <li>
                      <Link to={"/signup"}>Sign Up</Link>
                    </li>
                    <li>
                      <Link to={"/login"}>Log In</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={handleClick}>Logout</li>
                    <li>
                      <Link to={"/Profile"}>Profile</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to={"/about"}>About Us</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* <nav>
          <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
            <li>
              <a href="/">Home</a>
            </li>
            {!user ? (
              <>
                <li>
                  <a href="/signup">Signup</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </>
            ) : (
              <>
              <li onClick={handleClick}>Logout</li>
              <li><a href="/Profile">Profile</a></li>
              </>
            )}
          </ul>
        </nav> */}
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
