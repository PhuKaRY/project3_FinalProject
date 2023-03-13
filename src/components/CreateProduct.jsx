
import React, { useState } from "react";
import Confetti from "react-confetti";
import myApi from "../service/service";

const CreateProduct = ({getProducts, setShow}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(-1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const producCreate = { name, price, category };
    myApi.post("/products", producCreate)
    .then((res)=> {setShow(false);getProducts()})
    .catch((error) => console.log(error))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="string"
          value={name}
        />
        <label htmlFor="price"></label>
        <input
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          value={price}
        />
        <label htmlFor="Category"></label>
        <select
          value={category}
          name=""
          id=""
          onChange={(event) => setCategory(event.target.value)}
        >
          <option disabled value="-1">
            Select a category
          </option>
          <option value="bike">Bike</option>
          <option value="equipment">Equipment</option>
          <option value="other">Other</option>
        </select>
        <button>Create</button>
      </form>
    </div>
  );

};

export default CreateProduct;
