
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../service/service";
import CreateProduct from "../CreateProduct/CreateProduct";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const navigate= useNavigate();
  // const [refresh, setRefresh] = useState(0);
  //   console.log(user);
  const getProducts = async () => {
    myApi.get('/products/user')
    .then((res)=> setProducts(res.data))
      .catch((error) => console.log(error))
  }
  useEffect(()=> {
    getProducts();
  }, [])
  const handleDelete= async (id) => {
    myApi.delete(`/products/${id}`)
    .then((res) => console.log(products))
    // .then((res) => getProducts())
    .then((res) => navigate('/Profile'))
    .catch((error) => console.log(error))
  }
  console.log(user, products)
  if (!user || !products) {
    return <p>loading</p>;
  }
  return (
    <div>
      <h1>Profile of {user.username}</h1>
      <Link to={'/CreateProduct'}>Create A Product</Link>
      <div>
      {products.map((product)=> {
        return <Link to={`/Product/${product._id}`} key={product._id}>
        <div style={{border:"1px solid black"}}>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={()=>handleDelete(product._id)}>Delete</button>
        </div>
        </Link>
      })}
      </div>
    </div>
  );

};

export default Profile;
