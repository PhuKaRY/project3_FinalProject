import React, {useEffect, useState} from 'react'
import CreateMessage from './CreateMessage';

const ShowMessage = ({message, user, getMessages}) => {
  const [showFormCM, setShowFormCM] = useState(false);
  const [isMine, setMine] = useState(false);
  useEffect(()=>{
    if(message.sendBy._id===user._id){
      setMine(true);
    }
  }, [user, message])
  const handleSend= ()=> {
    getMessages();
    setShowFormCM(false);
  }
  return (
    <>
    {isMine?
    
    <div style={{display:'flex', justifyContent:'flex-end'}}>
       <div style={{display:'flex', flexDirection:'column', backgroundColor:'#8eb8f7', borderRadius:'10px', maxWidth:'40vw', margin:'1vh'}}>
        <div style={{display:'flex', alignItems:'center', paddingRight:'1vw'}}>
          <div style={{display:'flex', alignItems:'center', paddingLeft:'1vw'}}>
           <img style={{height:'3vh'}} src={message.sendBy.image} alt={message.sendBy.username} />
           <p>by</p> <h6 style={{paddingLeft:'1vw', paddingRight:'1vw'}}>{message.sendBy.username}</h6> <p>for</p>
          </div>
          <div style={{display:'flex', alignItems:'center', paddingLeft:'1vw'}}>
            <img style={{height:'3vh'}} src={message.product.picture} alt={message.product.name} />
            <h6>{message.product.name}</h6>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'row-reverse', justifyContent:'space-between', alignItems:'center', paddingRight:'1vw'}}>
         <h5>{message.content}</h5>
        </div>
       </div>
      </div>
      :
      <>
      <div style={{display:'flex', justifyContent:'flex-start'}}>
      <div style={{display:'flex', flexDirection:'column', backgroundColor:'beige', borderRadius:'10px', maxWidth:'40vw', margin:'1vh'}}>
        <div style={{display:'flex', alignItems:'center', paddingLeft:'1vw'}}>
          <div style={{display:'flex', alignItems:'center', paddingRight:'1vw'}}>
            <img style={{height:'3vh'}} src={message.sendBy.image} alt={message.sendBy.username} />
            <p>by</p> <h6 style={{paddingLeft:'1vw', paddingRight:'1vw'}}>{message.sendBy.username}</h6> <p>for</p>
          </div>
          <div style={{display:'flex', alignItems:'center', paddingRight:'1vw'}}>
            <img style={{height:'3vh'}} src={message.product.picture} alt={message.product.name} />
            <h6>{message.product.name}</h6>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingLeft:'1vw'}}>
          <h5 style={{paddingRight:'1vw'}}>{message.content}</h5>
          {message.sendBy._id!==user._id &&
            !showFormCM?
            <p style={{paddingRight:'1vw'}} onClick={()=> setShowFormCM(true)}>Respond</p>
            :
            <p style={{paddingRight:'1vw'}} onClick={()=> setShowFormCM(false)}>x</p>
        }
        </div>
      </div>
    </div>
      {showFormCM && 
              <div style={{display:'flex'}}>
              {/* <button style={{fontSize:'inherit'}} onClick={()=> setShowFormCM(false)}>X</button> */}
              <CreateMessage respond={message} productId={message.product._id} callback={handleSend}/>
              </div>
      }
      </>
    }
          
  </>
  )
}

export default ShowMessage