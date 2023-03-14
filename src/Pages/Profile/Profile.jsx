
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
    <div style={{display: "flex", flexDirection:'column', alignItems: "center", justifyContent:"center"}}>
      <div style={{display: "flex", flexDirection:'column', alignItems: "center"}}>
        <div style={{display:'flex', margin:"2rem", alignItems: "center"}}>
      <img src={user.image} alt={user.username} style={{width:'10vw', marginRight:'3vw'}} />
      <h1>{user.username}</h1>
        </div>
      <div style={{display:'flex', justifyContent:"space-between", width:'80vw', marginBottom:'2rem'}}>
      <div style={{width:'20vw', textAlign:"center"}}>
      {!showFormCP?
            <button onClick={()=> setShowFormCP(true)}>Create A Product</button>
        :
        <button onClick={()=> setShowFormCP(false)}>Hide</button>
        }
      </div>
      <div style={{width:'20vw', textAlign:"center"}}>
        {!showProducts?
            <button onClick={()=> setShowProducts(true)}>Your Products</button>
          :
          <button onClick={()=> setShowProducts(false)}>Hide</button>
        }
      </div>
      <div style={{width:'20vw', textAlign:"center"}}>
        {!showMessages?
            <button onClick={()=> setShowMessages(true)}>Your Messages</button>
          :
            <button onClick={()=> setShowMessages(false)}>Hide</button>
        }
        </div>
        <div style={{width:'20vw', textAlign:"center"}}>
        {!showFormUpUser?
        <button onClick={()=> setFormUpUser(true)}>Edit User</button>
      :
          <button onClick={()=> setFormUpUser(false)}>Hide</button>
        }
        </div>
      </div>
      </div>
      <div style={{display:"flex", flexWrap:"wrap", gap:'4vw', justifyContent:'center'}}>
      {showFormUpUser &&
        <div style={{marginBottom:'5vh', border:'1px solid black', padding:'2rem'}}>
          <h2>Update info</h2>
          <EditUser user={user} authenticateUser={authenticateUser} setFormUpUser={setFormUpUser} />
        </div>
      }
        {showFormCP &&
            <div style={{marginBottom:'5vh', border:'1px solid black', padding:'2rem'}}>
            <h2>Create A Product</h2>
            <CreateProduct getProducts={getProducts} setShow={setShowFormCP}/>
            </div>
        }
        </div>
        <div style={{display:"flex", flexDirection:'column', gap:'4vw', justifyContent:'center'}}>
        {showProducts &&
            <div style={{marginBottom:'5vh', border:'1px solid black', padding:'2rem'}}>
            <h2>Your Products</h2>
            <ListProduct products={products} deleteBtn={true} getProducts={getProducts} getMessages={getMessages}/>
            </div>
        }
        {showMessages &&
            <div style={{marginBottom:'5vh', border:'1px solid black', padding:'2rem'}}>
            <h2>Your Messages</h2>
            <ListMessages messages={messages} getMessages={getMessages}/>
            </div>
        }
      </div>
    </div>
  );

};

export default Profile;
