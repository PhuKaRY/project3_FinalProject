
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CreateProduct from "../CreateProduct/CreateProduct";

const Profile = () => {
  const { user } = useContext(AuthContext);
  //   console.log(user);
  if (!user) {
    return <p>loading</p>;
  }
  return (
    <div>
      <h1>Profile of {user.username}</h1>
      <CreateProduct />
    </div>
  );

};

export default Profile;
