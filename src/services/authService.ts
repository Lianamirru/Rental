import http from "../services/httpService";
import { API_URL } from "./consts";
import jwtDecode from "jwt-decode";
import { UserType } from "../types/userType";

const apiEndpoint = API_URL + "/auth";
const tokenKey = "token";

const jwt = getJwt();
if (jwt) http.setJwt(jwt);

export async function login(email: string, password: string) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) return null;
    const user = jwtDecode<UserType>(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}
