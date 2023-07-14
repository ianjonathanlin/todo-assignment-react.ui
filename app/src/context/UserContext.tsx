import { createContext } from "react";
import useUserAuth from "../hooks/useUserAuth";

interface UserContextProps {
  children: any;
}

export const UserContext = createContext({});

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const { isLogin, username, loginUser, logoutUser } = useUserAuth();

  const value = { isLogin, username, loginUser, logoutUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
