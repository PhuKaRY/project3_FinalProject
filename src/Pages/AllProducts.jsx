import React, { useState, useEffect } from "react";
import ListProduct from "../components/ListProduct";
import myApi from "../service/service";

const AllProducts = () => {
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
    <div>
  <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
        <input
          style={{ marginTop: "2px" }}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products 🔎 "
        />
        <fieldset>
          <legend>Filter by category</legend>
          <div>
            <label htmlFor="bike">Bike: </label>
            <input
              checked={filters.bike}
              onChange={handleCheckBox}
              type="checkbox"
              name="bike"
              id="bike"
            />
          </div>
          <div>
            <label htmlFor="equipment">Equipment: </label>
            <input
              checked={filters.equipment}
              onChange={handleCheckBox}
              type="checkbox"
              name="equipment"
              id="equipment"
            />
          </div>
          <div>
            <label htmlFor="other">Other: </label>
            <input
              checked={filters.other}
              type="checkbox"
              onChange={handleCheckBox}
              name="other"
              id="other"
            />
          </div>
        </fieldset>
      </div>
      <div>
        <ListProduct
          products={productToDisplay}
          getProducts={getProducts}
          deleteBtn={false}
          getMessages={null}
        />
      </div>
    </div>
  );
};


export default AllProducts