import { useState } from "react";
import "./App.css";
import Layout from "./Pages/Layout/Layout";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
// import Profile from "./Pages/Profile/Profile";
// import Product from "./Pages/ProductPage/Product";
// import Payment from "./Pages/PaymentPage/payment";
// import ListProduct from "./Pages/ListProduct/ListProduct";
// import CreateProduct from "./Pages/CreateProduct/CreateProduct";
// import ShowAllMessage from "./Pages/CreateMessage/ShowAllMessage";
// import ShowOneMessage from "./Pages/CreateMessage/SHowOneMessage";
// import Basket from "./Pages/BasketPage/Basket";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/Profile" element={<Profile />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/ListProduct" element={<ListProduct />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
          <Route path="/ShowAllMessage" element={<ShowAllMessage />} />
          <Route path="/ShowOneMessage" element={<ShowOneMessage />} />
          <Route path="/Basket" element={<Basket />} /> */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
