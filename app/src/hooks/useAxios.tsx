import { useContext } from "react";
import { IAuthToken } from "@/app/models/authToken";
import { AuthContext } from "../contexts/AuthContext";
import { apiUrl } from "../utils/env";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = apiUrl;

const useAxios = () => {
  const [isLogin, username, loginUser, logoutUser] = useContext(AuthContext);
  const { toast } = useToast();

  let tokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens")!)
    : null;

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${tokens?.authToken}` },
  });

  function invalidTokenAction() {
    logoutUser();
    toast({
      variant: "destructive",
      title: "Invalid session.",
      description: "Sorry, please login again.",
    });
  }

  axiosInstance.interceptors.request.use(async (req) => {
    // fetch new tokens
    tokens = localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens")!)
      : null;

    // terminate user session when no tokens are found
    if (!tokens) {
      invalidTokenAction();
      throw new axios.Cancel();
    }

    // reassign token if found
    req.headers.Authorization = `Bearer ${tokens.authToken}`;

    // check token if exp -> refresh token
    let userSession: any = jwtDecode(tokens.authToken);
    let isTokenExpired = moment()
      .utc()
      .isAfter(moment.unix(userSession.exp).utc());

    // if authToken not expired, return req
    if (!isTokenExpired) return req;

    // retrieve new tokens
    let response = await axios
      .post(`${baseURL}Authentication/refresh-token`, {
        authToken: tokens.authToken,
        refreshToken: tokens.refreshToken,
      })
      .catch(() => {
        // terminate user session when refresh token invalid / expired
        invalidTokenAction();
        throw new axios.Cancel();
      });

    let newTokens: IAuthToken = {
      authToken: response.data.authToken,
      refreshToken: response.data.refreshToken,
    };

    // set new token
    localStorage.setItem("tokens", JSON.stringify(newTokens));

    req.headers.Authorization = `Bearer ${newTokens.authToken}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
