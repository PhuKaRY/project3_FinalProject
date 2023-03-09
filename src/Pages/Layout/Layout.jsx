import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <header>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/signup">Signup</a></li>
                <li><a href="login">Login</a></li>
                <li><a href="logout">Logout</a></li>
            </ul>
        </nav>
    </header>
    <Outlet />
    </>
    // <div>Layout</div>
  );
};

export default Layout;
