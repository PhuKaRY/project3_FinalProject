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

  const [isMine, setIsMine]= useState(false);

  const [showEditForm, setEditForm]= useState(false);
  const [showFormCM, setShowFormCM] = useState(false);

  const {user} = useContext(AuthContext);

  const {id} = useParams();

  const navigate= useNavigate();

  const getMessages= () => {
    if(user){
      myApi.get(`/messages/product/${id}`)
          .then((res)=> setMessages(res.data))
          .catch((error)=> console.log(error))
    }
  }

  const getProduct= () => {
    myApi.get(`/products/${id}`)
        .then((res) => {
          setProduct(res.data)
          if(user && res.data.seller._id===user._id){
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
        navigate('/Profile')
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {
        getProduct();
        getMessages();
  }, [user, id])

  if(!product){
    return <p>Loading</p>
  }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{display:'flex', gap:'10vw', marginTop:'5vh', marginBottom:'3vh'}}>
        <img src={product.picture} alt={product.name} style={{height:'50vh'}} />
        <div style={{ display:'flex', flexDirection:'column', justifyContent: 'space-evenly'}}>
        <h2>{product.name}</h2>
        <p style={{color:'grey', backgroundColor: 'beige', borderRadius:'10px'}}> price: ${product.price}</p>
        <p style={{color: 'orange'}}>category: {product.category}</p>
        <Link to={`/products/${product.seller._id}`}>added by {product.seller.username}</Link>

        </div>
      </div>
         {isMine && 
         ((!showEditForm)?
         <div>
            <button onClick={()=>{setEditForm(true)}}>Update</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
         </div>
            :
            <div>
            <button onClick={()=>{setEditForm(false)}}>Hide</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            <EditProduct product={product} getProducts={getProduct} showEdit={setEditForm}/>
            </div>)}
        {!isMine &&
            ((!showFormCM)? 
            <button onClick={()=>{
              if(!user){
                navigate('/login');
              }
               setShowFormCM(true);
              }}>Contact Seller</button>
          :
            <div>
            <button onClick={()=> setShowFormCM(false)}>Unshow</button>
            <CreateMessage respond={false} productId={id} callback={handleSend}/>
            </div>)
        }
        {user && 
        <div>
          <h3 style={{marginTop:'2vh', marginBottom:'2vh'}}>Messages about this product</h3>
          <ListMessages messages={messages} getMessages={getMessages}/>
        </div>}
    </div>
  )
}

export default Product