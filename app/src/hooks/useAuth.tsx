import { useState } from "react";
import jwtDecode from "jwt-decode";

export type UseAuthType = [
  isLogin: boolean,
  username: string,
  loginUser: Function,
  logoutUser: Function
];

export function useAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  if (!isLogin) {
    localStorage.clear();
  }

  const loginUser = (authToken: string, refreshToken: string) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);

    const jwtToken: any = jwtDecode(authToken);

    setIsLogin(!isLogin);
    setUsername(jwtToken.userName);
  };

  const logoutUser = () => {
    localStorage.clear();

    setIsLogin(false);
    setUsername("");
  };

  return { isLogin, username, loginUser, logoutUser };
}
