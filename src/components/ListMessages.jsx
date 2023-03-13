import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import CreateMessage from './CreateMessage';

const ListMessages = ({messages, getMessages}) => {
    const {user} =useContext(AuthContext);
    const [showFormCM, setShowFormCM] = useState(false);
    const handleSend= ()=> {
      getMessages();
      setShowFormCM(false);
    }
    // console.log(messages)

    if (!messages) {
      return <p>Loading</p>;
    }
    if(!messages.length){
        return <p>No Products</p>;
    }

  return <div>
    {messages.map((message)=>{
        return <>
        {message.product?
        <>
          <p>by {message.sendBy.username} to {message.sendTo.username}</p>
          <p>{message.product.name} : {message.content}</p>
          {message.sendBy!==user._id &&
            (!showFormCM? 
              <button onClick={()=> setShowFormCM(true)}>Respond</button>
            :
              <>
              <button onClick={()=> setShowFormCM(false)}>Unshow</button>
              <CreateMessage respond={message} productId={message.product._id} callback={handleSend}/>
              </>)
          }
        </>
        :
        <p>The product is no longer in sale</p>
        }
        </>
    })}
  </div>

}

export default ListMessages