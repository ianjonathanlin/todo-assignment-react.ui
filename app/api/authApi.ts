import { IUser } from "../models/user";
import { IAuthToken } from "../models/authToken";
import { apiUrl } from "./env";

const baseUrl = apiUrl + "Authentication/";

export function register(newUser: IUser) {
  return fetch(baseUrl + "register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

export function authenticate(user: IUser) {
  return fetch(baseUrl + "authenticate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  });
}

export function refreshToken() {
  const credentials: IAuthToken = {
    authToken: localStorage.getItem("authToken")!,
    refreshToken: localStorage.getItem("refreshToken")!,
  };

  return fetch(baseUrl + "refresh-token", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
  });
}
