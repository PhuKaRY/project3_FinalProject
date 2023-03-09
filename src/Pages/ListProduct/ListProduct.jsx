import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../../service/service";

const ListProduct = () => {
  const [products, setProducts] = useState(null);
  useEffect(()=> {
    myApi.get('/products')
    .then((res) => setProducts(res.data))
    .catch((error) => console.log(error))
  }, [])
    //   console.log(products)
    if (!products) {
      return <p>Loading</p>;
    }
    if(!products.length){
        return <p>No Products</p>;
    }
  return <div>
    {products.map((product) => {
        return <Link to={`/Product/${product._id}`} key={product._id}>
        <div style={{border:"1px solid black"}}>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        </div>
        </Link>
    })}
  </div>;
};

export default ListProduct;
