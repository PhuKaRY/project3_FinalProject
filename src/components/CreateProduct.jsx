import React, { useState } from "react";
import myApi from "../service/service";

const CreateProduct = ({ getProducts, setShow }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('-1');

  const [picture, setPicture] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('category', `${category}`);

    myApi.post("/products", formData)
    .then((res)=> {
      setShow(false);
      getProducts();
    })
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
        <label htmlFor="picture">Picture</label>
        <input type="file" name="picture" id="picture" onChange={(e) => setPicture(e.target.files[0])}/>
        <label htmlFor="price"></label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min='0'
        />
        <label htmlFor="Category"></label>
        <select
          value={category}
          name="category"
          id="category"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option disabled value="-1">
            Select a category
          </option>
          <option value="bike">Bike 🚵‍♀️ </option>
          <option value="equipment">Equipment 🛠️ </option>
          <option value="other">Other 🧩</option>
        </select>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
