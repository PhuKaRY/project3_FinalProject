import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import myApi from '../../service/service';

const Product = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    useEffect(()=> {
        myApi.get(`/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((error)=> console.log(error))
    }, [])
    if(!product){
        return <p>Loading</p>
    }
  return (
    <div>
        <h2>{product.name}</h2>
        <p>${product.price}</p>
    </div>
  )
}

export default Product