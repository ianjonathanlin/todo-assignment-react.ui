import { createContext } from "react";
import { UseUserAuthType, useUserAuth } from "../hooks/useUserAuth";

interface UserContextProps {
  children: any;
}

export const UserContext = createContext<UseUserAuthType>(undefined!);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const { isLogin, username, loginUser, logoutUser } = useUserAuth();

  return (
    <UserContext.Provider value={[isLogin, username, loginUser, logoutUser]}>
      {children}
    </UserContext.Provider>
  );
};
