import http from "../services/httpService";
import { API_URL } from "./consts";

import { RegisterUserType } from "../types/userType";

const apiEndpoint = API_URL;

export function register(user: RegisterUserType) {
  return http.post(apiEndpoint + "/users", {
    email: user.username,
    password: user.password,
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
