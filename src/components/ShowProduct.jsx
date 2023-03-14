import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import myApi from "../service/service";

const ShowProduct = ({ product, deleteBtn, getProducts, getMessages }) => {
  const [showEditForm, setEditForm] = useState(false);

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
      }}
    >
      <Link to={`/Product/${product._id}`}>
        <img
          src={product.picture}
          alt={product.name}
          style={{ width: "10vw" }}
        />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
      {deleteBtn && (
        <>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
          {!showEditForm ? (
            <button
              onClick={() => {
                setEditForm(true);
              }}
            >
              Update
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditForm(false);
                }}
              >
                Hide
              </button>
              <EditProduct
                product={product}
                getProducts={getProducts}
                showEdit={setEditForm}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ShowProduct;
