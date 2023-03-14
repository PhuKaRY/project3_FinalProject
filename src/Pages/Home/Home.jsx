import React, { useState, useEffect } from "react";
import ListProduct from "../../components/ListProduct";
import myApi from "../../service/service";
import Vdbr from "../../video/vdbr.mp4";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    bike: false,
    equipment: false,
    other: false,
  });
  const getProducts = () => {
    myApi
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error));
  };

  // get one product
  useEffect(() => {
    // getProducts();

    let queryString = "";
    for (const key in filters) {
      if (filters[key]) {
        queryString += `&category=${key}`;
      }
    }
    myApi
      .get(`/products/?${queryString}`)
      .then((res) => setProducts(res.data))
      .catch((e) => console.error(e));
  }, [query, filters]);

  let productToDisplay = products;
  if (query != "") {
    productToDisplay = products.filter((element) => {
      // console.log(element);
      return element.name.includes(query);
    });
  }

  const handleCheckBox = (event) => {
    setFilters((current) => {
      return { ...current, [event.target.name]: event.target.checked };
    });
  };

  return (
      <div className="videobg">
        <video autoPlay loop muted>
          <source src={Vdbr} type="video/mp4" />
        </video>
      </div>
  );
};

export default Home;
