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
        {/* <picture style={{overflow:"hidden", borderRadius:'10px', width:'15vw', height:'25vh' }}>
        <img
          src={product.picture}
          alt={product.name}
          // style={{size:'contain'}}
        />
        </picture> */}
        <div style={{backgroundImage:`url(${product.picture})`,backgroundPosition:'center', borderRadius:'10px', backgroundSize:'cover', width:'15vw', height:'15vw', marginBottom:'1vh'}}></div>
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
