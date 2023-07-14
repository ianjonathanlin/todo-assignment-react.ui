import { useState } from "react";

export default function useUserAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  const loginUser = (name: string, authToken: string, refreshToken: string) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);

    setIsLogin(!isLogin);
    setUsername(name);
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsLogin(false);
    setUsername("");
  };

  return { isLogin, username, loginUser, logoutUser };
}
