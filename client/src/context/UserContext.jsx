import React, { createContext, useState } from "react";
import { privateInstance } from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setauth = () => {
      privateInstance
        .get("username")
        .then((response) => {
          setIsLoggedIn(response.data[0].name);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            setIsLoggedIn(null);
            navigate("/login");
          }
        });
  }
  const logout = () =>{
    setIsLoggedIn(null);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setauth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };