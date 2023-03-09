import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Layout = () => {
  const { user, authenticateUser, removeToken } = useContext(AuthContext);
  const handleClick = () => {
    removeToken();
    authenticateUser();
  };
  // console.log(user);
  return (
    <>
      <header style={{ width: "100vw" }}>
        <nav>
          <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li><a href="/ListProduct">All Products</a></li>
            {!user ? (
              <>
                <li>
                  <a href="/signup">Signup</a>
                </li>
                <li>
                  <a href="login">Login</a>
                </li>
              </>
            ) : (
              <>
              <li onClick={handleClick}>Logout</li>
              <li><a href="/Profile">Profile</a></li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
