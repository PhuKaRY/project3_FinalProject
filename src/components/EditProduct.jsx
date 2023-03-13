import React,{useState} from 'react'
import myApi from '../service/service';

const EditProduct = ({product, getProducts, showEdit}) => {
    const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [picture, setPicture] = useState(product.picture);

  const handleSubmit= (e)=> {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('category', `${category}`);
    myApi.patch(`/products/${product._id}`, formData)
    .then((res)=> getProducts())
    .catch((error) => console.log(error))
    showEdit(false)
  }

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
          <option value="bike">Bike 🚵‍♀️ </option>
          <option value="equipment">Equipment 🛠️ </option>
          <option value="other">Other 🧩</option>
        </select>
        <button>Create</button>
      </form>
    </div>
  )
}

export default EditProduct