import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("message");

  const [authUser, setAuthUser] = React.useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
