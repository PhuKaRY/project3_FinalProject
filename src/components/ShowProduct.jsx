import React, { useState } from "react";
import { Link } from "react-router-dom";

import myApi from "../service/service";

const ShowProduct = ({ product, deleteBtn, getProducts, getMessages }) => {
  const handleDelete = (id) => {
    myApi
      .delete(`/products/${id}`)
      .then((res) => {
        getMessages();
        getProducts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        border: "1px solid black",
        width: "15vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius:'10px'
      }}
    >
      <Link to={`/Product/${product._id}`}>
        <img
          src={product.picture}
          alt={product.name}
          style={{ maxWidth: "15vw", maxHeight: '30vh', borderRadius:'10px' }}
        />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
      {deleteBtn && (
        <>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ShowProduct;
