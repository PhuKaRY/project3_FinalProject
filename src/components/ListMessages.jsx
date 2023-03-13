import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import ShowMessage from './ShowMessage';

const ListMessages = ({messages, getMessages}) => {
    const {user} =useContext(AuthContext);
    const [queryUsers, setUsers] = useState('null');
    const [queryProducts, setProducts] = useState('null');
    const [messagesToDisplay, setDisplay] = useState(messages);
    
    useEffect(()=> {
      if(queryProducts==='null' && queryUsers==='null'){
        setDisplay(messages)
      }
      else if(queryProducts!=='null' && queryUsers!=='null'){
        const messagesToDisplay= messages
        .filter((message)=> message.product._id===queryProducts)
        .filter((message)=> message.users.includes(queryUsers))
        setDisplay(messagesToDisplay);
      }
      else if(queryProducts!=='null'){
        const messagesToDisplay= messages
        .filter((message)=> message.product._id===queryProducts);
        setDisplay(messagesToDisplay);
        
      }
      else if(queryUsers!=='null'){
        const messagesToDisplay= messages
        .filter((message)=> message.users.includes(queryUsers))
        setDisplay(messagesToDisplay);
      }
    }, [queryProducts, queryUsers, messages])

    const getProducts= ()=> {
      const productsId= messages.map((message) => message.product._id)
      const uniqueProdId= productsId.filter((el,i) => productsId.indexOf(el)===i)
      const products= messages.map((message) => message.product)
      const uniqueProd= uniqueProdId.map((id) => {
        return products.find((el) => el._id===id);
      })
      return uniqueProd;
    }
    const getUsers= ()=> {
      const usersId= messages.map((message) => {
        if(message.users[0]===user._id){
          return message.users[1]
        }else {
          return message.users[0];
        }
      })
      const users= messages.map((message) => {
        if(message.sendBy._id===user._id){
          return message.sendTo;
        }else {
          return message.sendBy;
        }
      })
      const uniqueUsersId= usersId.filter((el,i) => usersId.indexOf(el)===i)
      const uniqueUsers= uniqueUsersId.map((id) => users.find((el) => el._id==id))
      return uniqueUsers;
    }

    const uniqueUsers =getUsers();
    const uniqueProd = getProducts();


    if (!messages) {
      return <p>Loading</p>;
    }
    if(!messages.length){
        return <p>No Messages</p>;
    }

  return <div>
    <div>
      <select name="product" id="product" onChange={(e)=> setProducts(e.target.value)}>
          <option value='null'>All</option>
        {uniqueProd.map((product) => {
          return <option key={product._id} value={product._id}>{product.name}</option>
        })}
      </select>
      <select name="user" id="user" onChange={(e)=> setUsers(e.target.value)}>
          <option value='null'>All</option>
        {uniqueUsers.map((user) => {
          return <option key={user._id} value={user._id}>{user.username}</option>
        })}
      </select>
    </div>
    {messagesToDisplay.map((message)=>{
        return <ShowMessage key={message._id} message={message} user={user} getMessages={getMessages}/>
    })}
  </div>

}

export default ListMessages