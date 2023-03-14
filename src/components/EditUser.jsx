import React, {useState} from 'react'
import myApi from '../service/service'

const EditUser = ({ user, authenticateUser }) => {
    const [username, setUsername] = useState(user.username)
    const [image, setImage] = useState(user.image)

const handleSubmit= (event) => {
    event.preventDefault();
    const formData= new FormData();
    formData.append('image', image);
    formData.append('username', username);
    myApi.patch('/auth/user', formData)
    .then((res) => console.log(res))
    .then(res => authenticateUser())
    .catch((error)=> console.error(error))
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
            <label htmlFor="image">Image</label>
            <img src={user.image} alt={user.username} style={{width:'5vw'}}  />
            <input type="file" name="image" id="image" onChange={(e)=> setImage(e.target.files[0])}/>
            <button>Update</button>
        </form>
    </div>
  )
}

export default EditUser