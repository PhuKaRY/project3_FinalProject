import { useState } from "react";
import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Profile from "./Pages/Profile/Profile";
import Product from "./Pages/ProductPage/Product";
import Payment from "./Pages/PaymentPage/payment";
import ListProduct from "./Pages/ListProduct/ListProduct";
import Layout from "./Pages/Layout/Layout";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import ShowAllMessage from "./Pages/CreateMessage/ShowAllMessage";
import ShowOneMessage from "./Pages/CreateMessage/SHowOneMessage";
import Basket from "./Pages/BasketPage/Basket";
import Error from "./Pages/Error/Error";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <Routes>
          <route path="/" element={<Home />} />
          <route path="/Signup" element={<Signup />} />
          <route path="/Login" element={<Login />} />
          <route path="/Logout" element={<Logout />} />
          <route path="/Profile" element={<Profile />} />
          <route path="/Product" element={<Product />} />
          <route path="/Payment" element={<Payment />} />
          <route path="/ListProduct" element={<ListProduct />} />
          <route path="/Layout" element={<Layout />} />
          <route path="/CreateProduct" element={<CreateProduct />} />
          <route path="/ShowAllMessage" element={<ShowAllMessage />} />
          <route path="/ShowOneMessage" element={<ShowOneMessage />} />
          <route path="/Basket" element={<Basket />} />
          <route path="*" element={<Error />} />
        </Routes>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
