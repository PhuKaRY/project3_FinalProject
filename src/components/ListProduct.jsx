import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../service/service";

const ListProduct = ({ products, deleteBtn, getProducts, getMessages }) => {
  //   console.log(products)
  const handleDelete = (id) => {
    myApi
      .delete(`/products/${id}`)
      .then((res) => {
        getMessages();
        getProducts();
      })
      .catch((error) => console.log(error));
  };

  if (!products) {
    return <p>Loading</p>;
  }
  if (!products.length) {
    return <p>No Products</p>;
  }

  return (
    <div>
      {products.map((product) => {
        return (
          <>
            <Link to={`/Product/${product._id}`} key={product._id}>
              <div style={{ border: "1px solid black" }}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
            {deleteBtn && (
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            )}
          </>
        );
      })}
      {/* <div>
        <legend>Filter by category</legend>
        <label htmlFor="get one product"> Get One Product </label>
        <input
          checked={filters.name}
          type="checkbox"
          onChange={handleCheckBox}
          name="name"
          id="name"
        />
      </div> */}
    </div>
  );

};

export default ListProduct;
