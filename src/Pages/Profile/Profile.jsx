
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../service/service";
import CreateProduct from "../../components/CreateProduct";
import ListProduct from "../../components/ListProduct";
import ListMessages from "../../components/ListMessages";
import EditUser from "../../components/EditUser";

const Profile = () => {
  const { user, authenticateUser } = useContext(AuthContext);

  const [products, setProducts] = useState(null);
  const [messages, setMessages] = useState(null);

  const [showFormCP, setShowFormCP] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showFormUpUser, setFormUpUser] = useState(false);

  const getProducts = async () => {
    myApi.get(`/products/user/${user._id}`)
    .then((res)=> setProducts(res.data))
      .catch((error) => console.log(error))
  }
  const getMessages = async () => {
    myApi.get('/messages')
    .then((res)=> setMessages(res.data.filter((message) => message.product)))
      .catch((error) => console.log(error))
  }
  useEffect(()=> {
    if(user){
      getProducts();
      getMessages();
    }
  }, [user])
  if (!user) {
    return <p>loading user</p>;
  }
  if (!products) {
    return <p>loading products</p>;
  }
  if (!messages) {
    return <p>loading messages</p>;
  }
  // console.log(messages)
  return (
    <div>
      <div>
      <img src={user.image} alt={user.username} style={{width:'5vw'}} />
      <h1>Profile of {user.username}</h1>
      {!showFormUpUser?
        <button onClick={()=> setFormUpUser(true)}>Edit User</button>
      :
        <>
          <button onClick={()=> setFormUpUser(false)}>Hide</button>
          <EditUser user={user} authenticateUser={authenticateUser} />
        </>
      }
      </div>
        {!showFormCP?
            <button onClick={()=> setShowFormCP(true)}>Create A Product</button>
          :
            <>
            <button onClick={()=> setShowFormCP(false)}>Hide</button>
            <CreateProduct getProducts={getProducts} setShow={setShowFormCP}/>
            </>
        }
      <div>
        {!showProducts?
            <button onClick={()=> setShowProducts(true)}>Your Products</button>
          :
            <>
            <button onClick={()=> setShowProducts(false)}>Hide</button>
            <ListProduct products={products} deleteBtn={true} getProducts={getProducts} getMessages={getMessages}/>
            </>
        }
      </div>
      <div>
        {!showMessages?
            <button onClick={()=> setShowMessages(true)}>Your Messages</button>
          :
            <>
            <button onClick={()=> setShowMessages(false)}>Hide</button>
            <ListMessages messages={messages} getMessages={getMessages}/>
            </>
        }
      </div>
    </div>
  );

};

export default Profile;
