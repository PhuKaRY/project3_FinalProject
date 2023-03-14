import React from "react";
import { useState } from "react";
import myApi from "../../service/service";
import { useNavigate } from "react-router-dom";
import logo from "../../pictures/logoBike.png";

const Signup = () => {
  const [{ username, password }, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    const updatedState = {
      username,
      password,
      [event.target.id]: event.target.value,
    };
    setFormData(updatedState);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userToCreate = { username, password };

    try {
      const response = await myApi.post("/auth/signup", userToCreate);
      console.log(response.status);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (

    <>
      <form onSubmit={handleSubmit} style={{marginTop:'5vh'}}>
        <div>
          <label htmlFor="username">
            Username:&nbsp;
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:&nbsp;
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </label>
        </div>
        {error.length > 0 && <p className="error">{error}</p>}
        <button>Signup</button>
      </form>
      <picture
        style={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          height: "300px",
          width: "300px",
          marginTop: "50px",
        }}
      >
        <img src={logo} />
      </picture>
    </>

  );
};

export default Signup;
