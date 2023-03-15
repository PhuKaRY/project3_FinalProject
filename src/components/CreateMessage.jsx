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
            // message send to a seller
            const send= {
                content: message,
                product: productId,
                users: [product.data.seller._id, user._id],
                sendBy: user._id,
                sendTo: product.data.seller
            }
            const res= await myApi.post('/messages', send);
            callback();
        }
        else {
            // message send to an client
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

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', flexDirection:'row', maxWidth:'none', gap:'0'}}>
        <textarea name="message" value={message} id="message" style={{height:'10vh', width:'30vw', marginRight:'2vw'}} onChange={(event)=> setMessage(event.target.value)}></textarea>
        <button>Send</button>
    </form>
  )
}

export default CreateMessage