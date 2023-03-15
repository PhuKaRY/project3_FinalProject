import React, { useEffect, useState } from "react";
import ShowProduct from "./ShowProduct";

const ListProduct = ({ products, deleteBtn, getProducts, getMessages }) => {
  if (!products) {
    return <p>Loading</p>;
  }
  if (!products.length) {
    return <p>No Products</p>;
  }

  return (
    <div style={{display: 'flex',flexWrap:'wrap', padding:'4vh 4vw', gap:'3vw', borderRadius:'10px'}}>
      {products.map((product) => {
        return (
          <ShowProduct key={product._id} product={product} deleteBtn={deleteBtn} getProducts={getProducts} getMessages={getMessages}/>
        );
      })}
    </div>
  );

};

export default ListProduct;
