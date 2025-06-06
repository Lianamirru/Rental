import http from "../services/httpService";
import { API_URL } from "./consts";

const apiEndpoint = API_URL + "/returns";

type ReturnType = {
  _id?: string;
  customer: { _id: string; name: string; isGold: boolean; phone: string };
  instrument: { maker: string; model: string; year: string };
  rentalFee: Number;
  dateOut: Date;
  dateReturned: Date;
};

export function postReturn(
  rental: ReturnType
): Promise<{ data: { rentalFee: number } }> {
  delete rental._id;
  return http.post(apiEndpoint, rental);
}
