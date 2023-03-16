import React, {useEffect, useState} from 'react'
import CreateMessage from './CreateMessage';

const ShowMessage = ({message, user, getMessages}) => {
  const [showFormCM, setShowFormCM] = useState(false);
  const [isMine, setMine] = useState(false);
  // const [content, setContent]= useState([])

  // const contentResize= ()=> {
  //   if(message.content.length>window.innerWidth/50){
  //     setContent([message.content.slice(0,window.innerWidth/50-1)]);
  //     let j=1;
  //     for(let i=window.innerWidth/50; i<message.content.length; i+=window.innerWidth/50){
  //       if(i+window.innerWidth/50-1<message.content.length){
  //         setContent(current=> [...current, message.content.slice(i, i+window.innerWidth/50-1)])
  //       }else{
  //         setContent(current=> [...current, message.content.slice(i)])
  //       }
  //     }
  //   }else {
  //     setContent([message.content]);
  //   }
  // }
  
  // window.addEventListener('resize', contentResize)
  
  useEffect(()=>{
    // contentResize();
    // console.log(window.innerWidth)
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
    {/* you message div */}
    {isMine?   
      <div style={{display:'flex', justifyContent:'flex-end'}}>
       <div style={{display:'flex', flexDirection:'column', backgroundColor:'#8eb8f7', borderRadius:'15px', maxWidth:'40vw', margin:'1vh'}}>
        <div style={{display:'flex', alignItems:'center', paddingRight:'1vw', justifyContent:'right'}}>
          <div style={{display:'flex', alignItems:'center', paddingLeft:'1vw'}}>
            <p>from</p> 
           <img style={{height:'3vh', paddingLeft:'1vw'}} src={message.sendBy.image} alt={message.sendBy.username} />
           <h6 style={{paddingRight:'1vw'}}>{message.sendBy.username}</h6> 
           <p>for</p>
          </div>
          <div style={{display:'flex', alignItems:'center', paddingLeft:'1vw'}}>
            <img style={{height:'3vh'}} src={message.product.picture} alt={message.product.name} />
            <h6>{message.product.name}</h6>
          </div>
        </div>
        <div style={{display:'flex',    textAlign: 'left', flexDirection:'row-reverse', justifyContent:'space-between', alignItems:'center', paddingRight:'1vw'}}>
         <h5 style={{overflowWrap: 'break-word', margin: '0 auto', maxWidth: '90%'}}>{message.content}</h5>
         {/* <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', paddingLeft:'2vh'}}>
         {content.map((line, i)=> {
         return <h5 key={i}>{line}</h5>
          })
        }
        </div> */}
        </div>
       </div>
      </div>
      :
      // other user message div
      <>
    <div style={{display:'flex', justifyContent:'flex-start'}}>
      <div style={{display:'flex', flexDirection:'column', backgroundColor:'beige', borderRadius:'15px', maxWidth:'40vw', margin:'1vh'}}>
        <div style={{display:'flex', alignItems:'center', paddingLeft:'1vw'}}>
          <div style={{display:'flex', alignItems:'center', paddingRight:'1vw'}}>
            <p>from</p> 
            <img style={{height:'3vh', paddingLeft:'1vw'}} src={message.sendBy.image} alt={message.sendBy.username} />
            <h6 style={{paddingRight:'1vw'}}>{message.sendBy.username}</h6> <p>for</p>
          </div>
          <div style={{display:'flex', alignItems:'center', paddingRight:'1vw'}}>
            <img style={{height:'3vh'}} src={message.product.picture} alt={message.product.name} />
            <h6>{message.product.name}</h6>
          </div>
        </div>
        <div style={{display:'flex',    textAlign: 'left', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:'1vw'}}>
          <h5 style={{overflowWrap: 'break-word', margin: '0 auto', maxWidth: '90%'}}>{message.content}</h5>
          {message.sendBy._id!==user._id &&
            !showFormCM?
            <p className='respond' style={{paddingRight:'1vw'}} onClick={()=> setShowFormCM(true)}>...💬</p>
            :
            <p className='respond' style={{paddingRight:'1vw'}} onClick={()=> setShowFormCM(false)}>x</p>
        }
        </div>
      </div>
    </div>
      {showFormCM && 
              <div style={{display:'flex'}}>
              <CreateMessage respond={message} productId={message.product._id} callback={handleSend}/>
              </div>
      }
      </>
    }
          
  </>
  )
}

export default ShowMessage