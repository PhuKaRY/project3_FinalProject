import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../service/service";
import CreateProduct from "../../components/CreateProduct";
import ListProduct from "../../components/ListProduct";
import ListMessages from "../../components/ListMessages";
import EditUser from "../../components/EditUser";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, authenticateUser } = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const [messages, setMessages] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    bike: false,
    equipment: false,
    other: false,
  });

  const [showFormCP, setShowFormCP] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showFormUpUser, setFormUpUser] = useState(false);
  
  const navigate= useNavigate();

  const getProducts = async () => {
    let queryString = "";
    for (const key in filters) {
      if (filters[key]) {
        queryString += `&category=${key}`;
      }
    }
    myApi.get(`/products/user/${user._id}/?${queryString}`)
    .then((res)=> setProducts(res.data))
    .catch((error) => console.log(error))
  }
  
  const getMessages = async () => {
    myApi.get('/messages')
    .then((res)=> setMessages(res.data.filter((message) => message.product)))
    .catch((error) => console.log(error))
  }

  const handleCheckBox = (event) => {
    setFilters((current) => {
      return { ...current, [event.target.name]: event.target.checked };
    });
  };

  useEffect(()=> {
    if(!user){
      navigate('/login');
    }else {
      getProducts();
      getMessages();
    }
  }, [user, filters])

  if (!user) {
    return <p>loading user</p>;
  }
  if (!products) {
    return <p>loading products</p>;
  }
  if (!messages) {
    return <p>loading messages</p>;
  }

  let productToDisplay = products;
  if (query != "") {
    productToDisplay = products.filter((element) => {
      return element.name.includes(query);
    });
  }
  
  return (
    <div style={{display: "flex", flexDirection:'column', alignItems: "center", justifyContent:"center"}}>
      {/* block for title & button hide/show */}
      <div style={{display: "flex", flexDirection:'column', alignItems: "center"}}>
        {/* Title div */}
        <div style={{display:'flex', margin:"2rem", alignItems: "center"}}>
          <picture style={{width:'10vw', marginRight:'3vw', height:'10vw', borderRadius:'50%', overflow: "hidden", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <img src={user.image} alt={user.username} style={{height:'10vw'}} />
          </picture>
        <h1>{user.username}</h1>
        </div>

      {/* button div */}
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

          {/* form div */}
      <div style={{display:"flex", flexWrap:"wrap", gap:'4vw', justifyContent:'center'}}>
        {/* editUser form div */}
        {showFormUpUser &&
          <div style={{marginBottom:'5vh', border:'1px solid black', padding:'2rem'}}>
            <h2>Update info</h2>
            <EditUser user={user} authenticateUser={authenticateUser} setFormUpUser={setFormUpUser} />
          </div>
        }
        {/* create product form div */}
        {showFormCP &&
            <div style={{marginBottom:'5vh', border:'1px solid black', padding:'2rem'}}>
            <h2>Create A Product</h2>
            <CreateProduct getProducts={getProducts} setShow={setShowFormCP}/>
            </div>
        }
      </div>

        {/* list div */}
      <div style={{display:"flex", flexDirection:'column', gap:'4vw', justifyContent:'center', alignItems:'center'}}>
        {/* list product div */}
        {showProducts &&
            <div style={{marginBottom:'5vh'}}>
              <h2>Your Products</h2>
              {/* query div */}
              <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products 🔎 "
                />
                <fieldset>
                  <legend>Filter by category</legend>
                    <label htmlFor="bike">Bike: </label>
                    <input
                      checked={filters.bike}
                      onChange={handleCheckBox}
                      type="checkbox"
                      name="bike"
                      id="bike"
                    />
                    <label htmlFor="equipment">Equipment: </label>
                    <input
                      checked={filters.equipment}
                      onChange={handleCheckBox}
                      type="checkbox"
                      name="equipment"
                      id="equipment"
                    />
                    <label htmlFor="other">Other: </label>
                    <input
                      checked={filters.other}
                      type="checkbox"
                      onChange={handleCheckBox}
                      name="other"
                      id="other"
                    />
                </fieldset>
              </div>
              <ListProduct products={productToDisplay} deleteBtn={true} getProducts={getProducts} getMessages={getMessages}/>
            </div>
        }
        {/* list message div */}
        {showMessages &&
            <div style={{marginBottom:'5vh'}}>
            <h2>Your Messages</h2>
            <ListMessages messages={messages} getMessages={getMessages}/>
            </div>
        }
      </div>

    </div>
  );

};

export default Profile;
