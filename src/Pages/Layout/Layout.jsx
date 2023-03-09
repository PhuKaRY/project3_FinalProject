import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Layout = () => {
  const { user, authenticateUser, removeToken } = useContext(AuthContext);
  const handleClick = () => {
    removeToken();
    authenticateUser();
  };
  console.log(user);
  return (
    <>
      <header style={{ width: "100vw" }}>
        <nav>
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
                  <a href="login">Login</a>
                </li>
              </>
            ) : (
              <li onClick={handleClick}>Logout</li>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
    // <div>Layout</div>
  );
};

export default Layout;
