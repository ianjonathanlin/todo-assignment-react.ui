import { IUser } from "../models/user";
import { IAuthToken } from "../models/authToken";
import { apiUrl } from "./env";

const axios = require("axios").default;

const baseUrl = apiUrl + "Authentication/";

export function register(newUser: IUser) {
  return axios.post(baseUrl + "register", JSON.stringify(newUser), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function authenticate(user: IUser) {
  return axios.post(baseUrl + "authenticate", JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function refreshToken() {
  const credentials: IAuthToken = {
    authToken: localStorage.getItem("authToken")!,
    refreshToken: localStorage.getItem("refreshToken")!,
  };

  return axios.post(baseUrl + "refresh-token", JSON.stringify(credentials), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
