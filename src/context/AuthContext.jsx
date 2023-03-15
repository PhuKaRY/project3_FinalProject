import { createContext, useState, useEffect } from "react";
import myApi from "./../service/service";

export const AuthContext = createContext();

function AuthContextWrapper(props) {
  const [user, setUser] = useState(null);

  function storeToken(receivedToken) {
    localStorage.setItem("token", receivedToken);
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function removeToken() {
    localStorage.removeItem("token");
  }

  async function authenticateUser() {
    try {
      const currentToken = getToken();
      if (!currentToken) {
        setUser(null);
        return;
      }
      const response = await myApi.get("/auth/user");
      setUser(response.data);
    } catch (error) {
      console.log(error.message);
      setUser(null);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        user,
        authenticateUser,
        removeToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
