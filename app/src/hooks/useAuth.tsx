"use client";

import { useEffect, useState } from "react";
import { IAuthToken } from "@/app/models/authToken";
import jwtDecode from "jwt-decode";
import moment from "moment";

export type UseAuthType = [
  isLogin: boolean,
  username: string,
  loginUser: Function,
  logoutUser: Function
];

export function useAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    checkExistingTokenValidity();
  }, []);

  function checkExistingTokenValidity() {
    let tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens")!)
      : null;

    if (tokens?.authToken) {
      // reestablish user session if token is not expired
      let userSession: any = jwtDecode(tokens.authToken);
      let isTokenExpired = moment()
        .utc()
        .isAfter(moment.unix(userSession.exp).utc());

      if (!isTokenExpired) {
        const decodedAuthToken: any = jwtDecode(tokens.authToken);
        setIsLogin(!isLogin);
        setUsername(decodedAuthToken.userName);
      } else {
        // if token expired, clear everything (logout)
        logoutUser();
      }
    } else {
      // clear everything (logout) if no tokens are persisted
      logoutUser();
    }
  }

  const loginUser = (authToken: string, refreshToken: string) => {
    const newTokens: IAuthToken = {
      authToken: authToken,
      refreshToken: refreshToken,
    };

    localStorage.setItem("tokens", JSON.stringify(newTokens));

    const decodedAuthToken: any = jwtDecode(authToken);

    setIsLogin(!isLogin);
    setUsername(decodedAuthToken.userName);
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsLogin(false);
    setUsername("");
  };

  return { isLogin, username, loginUser, logoutUser };
}
