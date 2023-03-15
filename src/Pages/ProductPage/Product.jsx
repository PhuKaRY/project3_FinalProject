import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Link, useParams, useNavigate } from 'react-router-dom'
import myApi from '../../service/service';
import CreateMessage from '../../components/CreateMessage';
import ListMessages from '../../components/ListMessages';
import EditProduct from '../../components/EditProduct';


const Product = () => {
  const [product, setProduct] = useState(null);
  const [messages, setMessages] = useState(null);
  const [showEditForm, setEditForm]= useState(false);

  const [isMine, setIsMine]= useState(false);
  const [showFormCM, setShowFormCM] = useState(false);
  const {user} = useContext(AuthContext);
  const {id} = useParams();
  const navigate= useNavigate();

  const getMessages= () => {
    myApi.get(`/messages/product/${id}`)
        .then((res)=> setMessages(res.data))
        .catch((error)=> console.log(error))
  }

  const getProduct= () => {
    myApi.get(`/products/${id}`)
        .then((res) => {
          setProduct(res.data)
          if(res.data.seller._id===user._id){
            setIsMine(true);
          }
        })
        .catch((error)=> console.log(error))
  }

  const handleSend= ()=> {
    setShowFormCM(false);
    getMessages();
  }

  const handleDelete = (id) => {
    myApi
      .delete(`/products/${id}`)
      .then((res) => {
        // getMessages();
        // getProducts();
        navigate('/Profile')
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {
        getProduct();
        getMessages();
  }, [user, id])

  if(!product || !messages){
    return <p>Loading</p>
  }
  return (
    <div>
        <h2>{product.name}</h2>
        <img src={product.picture} alt={product.name} style={{height:'30vh'}} />
        <p>${product.price}</p>
        <p>{product.category}</p>
        <Link to={`/products/${product.seller._id}`}>by {product.seller.username}</Link>
        <div>

         {isMine && 
         ((!showEditForm)?
         <>
            <button onClick={()=>{setEditForm(true)}}>Update</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
         </>
            :
            <>
            <button onClick={()=>{setEditForm(false)}}>Hide</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            <EditProduct product={product} getProducts={getProduct} showEdit={setEditForm}/>
            </>)}
        {!isMine &&
            ((!showFormCM)? 
            <button onClick={()=>{
              if(!user){
                navigate('/login');
              }
               setShowFormCM(true);
              }}>Contact Seller</button>
          :
            <>
            <button onClick={()=> setShowFormCM(false)}>Unshow</button>
            <CreateMessage respond={false} productId={id} callback={handleSend}/>
            </>)
        }
        </div>
        <h3>Messages about this product</h3>
        <ListMessages messages={messages} getMessages={getMessages}/>
    </div>
  )
}

export default Product