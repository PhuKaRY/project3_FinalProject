import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import EditProduct from './EditProduct';
import myApi from "../service/service";


const ShowProduct = ({product, deleteBtn, getProducts, getMessages}) => {
    const [showEditForm, setEditForm]= useState(false);

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
    <div>
            <Link to={`/Product/${product._id}`}>
              <div style={{ border: "1px solid black" }}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </Link>
            {deleteBtn && (
              <>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
              {!showEditForm?
              <button onClick={()=>{setEditForm(true)}}>Update</button>
              :
              <>
              <button onClick={()=>{setEditForm(false)}}>Hide</button>
              <EditProduct product={product} getProducts={getProducts} showEdit={setEditForm}/>
              </>
              }
              </>
            )}
          </div>
  )
}

export default ShowProduct