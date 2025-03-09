import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

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
    <UserContext.Provider value={{ uToken, setUToken,backendURL }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;