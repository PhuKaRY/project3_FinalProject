import React,{useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import myApi from '../service/service';

const CreateMessage = ({productId, respond, callback}) => {
    const [message, setMessage] = useState('');
    const {user} = useContext(AuthContext);

    const handleSubmit= async (event) => {
        event.preventDefault();
        const product= await myApi.get(`/products/${productId}`)
        if(!respond){
            const send= {
                content: message,
                product: productId,
                users: [product.data.seller._id, user._id],
                sendBy: user._id,
                sendTo: product.data.seller
            }
            const res= await myApi.post('/messages', send);
            callback(false);
        }
        else {
            let to='';
            if(respond.users[0]===user._id){
                to= respond.users[1];
            }else {
                to= respond.users[0];
            }
            const send= {
                content: message,
                product: productId,
                users: [respond.users[0], respond.users[1]],
                sendBy: user._id,
                sendTo: to,
            }
            const res= await myApi.post('/messages', send);
            callback();
        }
    }
    if(user){
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>Enter you message</label>
        <textarea name="message" value={message} id="message" cols="30" rows="10" onChange={(event)=> setMessage(event.target.value)}></textarea>
        <button>Send</button>
    </form>
  )
}

export default CreateMessage