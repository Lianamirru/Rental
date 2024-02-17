import http from "../services/httpService";
import apiUrl from "./config.json";

import { RegisterUserType } from "../types/userType";

const apiEndpoint = apiUrl.apiUrl;

export function register(user: RegisterUserType) {
  return http.post(apiEndpoint + "/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function getUser(userId: string) {
  return http.get(apiEndpoint + "/users" + userId);
}

export function saveCustomer(
  userId: string | undefined,
  name: string,
  phone: string
): Promise<{ data: string }> {
  return http.post(apiEndpoint + "/customers", {
    userId,
    name,
    phone,
  });
}

export type CustomerType = { name: string; phone: string; _id: string };

export function getCustomer(
  userId: string | undefined
): Promise<{ data: CustomerType }> {
  return http.get(apiEndpoint + "/customers/" + userId);
}

export function editCustomer(
  customerId: string,
  userId: string | undefined,
  name: string,
  phone: string
) {
  return http.put(apiEndpoint + "/customers/" + customerId, {
    userId,
    name,
    phone,
  });
}

export function getCustomerById(id: string): Promise<{ data: CustomerType }> {
  return http.get(apiEndpoint + "/customers/" + id);
}
