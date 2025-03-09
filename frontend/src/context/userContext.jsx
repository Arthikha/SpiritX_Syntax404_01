import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || "");
  const backendURL = "http://localhost:4500"

  useEffect(() => {
    const token = localStorage.getItem('uToken');
    if (token) {
      setUToken(token);
    }
  }, []);

  return (
    <userContext.Provider value={{ uToken, setUToken,backendURL }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;