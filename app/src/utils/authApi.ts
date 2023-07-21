import { IUser } from "../../models/user";
import { apiUrl } from "./env";
import axios from "axios";

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
