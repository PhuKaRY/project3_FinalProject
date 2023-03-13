import React, { useEffect, useState } from "react";
import ShowProduct from "./ShowProduct";

const ListProduct = ({ products, deleteBtn, getProducts, getMessages }) => {
  //   console.log(products)

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
          <ShowProduct key={product._id} product={product} deleteBtn={deleteBtn} getProducts={getProducts} getMessages={getMessages}/>
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
