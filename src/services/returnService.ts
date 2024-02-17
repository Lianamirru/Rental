import http from "../services/httpService";
import apiUrl from "./config.json";

const apiEndpoint = apiUrl.apiUrl + "/returns";

type ReturnType = {
  _id?: string;
  customer: { _id: string; name: string; isGold: boolean; phone: string };
  movie: { title: string };
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
