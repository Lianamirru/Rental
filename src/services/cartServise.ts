import http from "../services/httpService";
import { InstrumentType } from "../types/instrumentType";
import apiUrl from "./config.json";

const apiEndpoint = apiUrl.apiUrl + "/cart";

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
