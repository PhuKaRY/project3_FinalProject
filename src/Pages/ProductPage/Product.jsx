import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom'
import myApi from '../../service/service';
import CreateMessage from '../../components/CreateMessage';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [isMine, setIsMine]= useState(false);
  const [showFormCM, setShowFormCM] = useState(false);
  const {user} = useContext(AuthContext);
  const {id} = useParams();

  useEffect(()=> {
        myApi.get(`/products/${id}`)
        .then((res) => {
          setProduct(res.data)
          if(res.data.seller===user._id){
            setIsMine(true);
          }
        })
        .catch((error)=> console.log(error))
  }, [user])

  if(!product){
    return <p>Loading</p>
  }
console.log(isMine)
  return (
    <div>
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <p>{product.category}</p>
        <Link to={`/products/${product.seller._id}`}>by {product.seller.username}</Link>
        {!isMine &&
          ((!showFormCM)? 
            <button onClick={()=> setShowFormCM(true)}>Contact Seller</button>
          :
            <>
            <button onClick={()=> setShowFormCM(false)}>Unshow</button>
            <CreateMessage respond={false} productId={id} callback={setShowFormCM}/>
            </>)
        }
    </div>
  )
}

export default Product