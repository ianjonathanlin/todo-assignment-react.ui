"use client";

import { createContext } from "react";
import { UseAuthType, useAuth } from "../hooks/useAuth";

interface AuthContextProps {
  children: any;
}

export const AuthContext = createContext<UseAuthType>(undefined!);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const { isLogin, username, loginUser, logoutUser } = useAuth();

  return (
    <AuthContext.Provider value={[isLogin, username, loginUser, logoutUser]}>
      {children}
    </AuthContext.Provider>
  );
};
