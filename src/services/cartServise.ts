import http from "../services/httpService";
import { InstrumentType } from "../types/instrumentType";
import { API_URL } from "./consts";

const apiEndpoint = API_URL + "/cart";

export type CartItemType = {
  _id: string;
  instrument: InstrumentType;
};

export function getCartItems(): Promise<{ data: CartItemType[] | [] }> {
  return http.get(apiEndpoint);
}

export function addToCart(instrumentId: String) {
  return http.post(apiEndpoint + `/${instrumentId}`);
}

export function deleteFromCart(instrumentId: String) {
  return http.delete(apiEndpoint + `/${instrumentId}`);
}
