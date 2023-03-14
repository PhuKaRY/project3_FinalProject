import React, {useState} from 'react'
import CreateMessage from './CreateMessage';

const ShowMessage = ({message, user, getMessages}) => {
  const [showFormCM, setShowFormCM] = useState(false);
  

  const handleSend= ()=> {
    getMessages();
    setShowFormCM(false);
  }
  return (
    <div>
          <p>by {message.sendBy.username} to {message.sendTo.username}</p>
          <p>{message.product.name} : {message.content}</p>
          {message.sendBy._id!==user._id &&
            (!showFormCM? 
              <button onClick={()=> setShowFormCM(true)}>Respond</button>
            :
              <>
              <button onClick={()=> setShowFormCM(false)}>Unshow</button>
              <CreateMessage respond={message} productId={message.product._id} callback={handleSend}/>
              </>)
        }
        </div>
  )
}

export default ShowMessage