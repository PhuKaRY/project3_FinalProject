import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import myApi from '../service/service';
import ListProduct from '../components/ListProduct';

const ProductsOfSeller = () => {
    const [products, setProducts] = useState(null);
    const {userId}= useParams();

    const getProducts = async () => {
        myApi.get(`/products/user/${userId}`)
        .then((res)=> setProducts(res.data))
          .catch((error) => console.log(error))
      }

      useEffect(()=> {
        getProducts();
      }, [userId])
      if(!products){
        return <p>Loading</p>
      }
  return (
    <div>
    <h1>{products[0].seller.username}</h1>
    <div>button/field for the query</div>
    <div>
      <ListProduct products={products} getProducts={getProducts} deleteBtn={false}/>
    </div>
  </div>
  )
}

export default ProductsOfSeller