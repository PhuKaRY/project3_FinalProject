import { useState } from "react";
import "./App.css";
import Layout from "./Pages/Layout/Layout";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import ListProduct from "./components/ListProduct";
import Profile from "./Pages/Profile/Profile";
import Product from "./Pages/ProductPage/Product";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import ProductsOfSeller from "./Pages/ProductsOfSeller";
import About from "./Pages/About";
import AllProducts from "./Pages/AllProducts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route path="/ListProduct" element={<ListProduct />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Product/:id" element={<Product />} />
          <Route path="/products/:userId" element={<ProductsOfSeller />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
