import http from "./httpService";
import { API_URL } from "./consts";

const apiEndpoint = API_URL + "/rentals";

type RentalDateType = { dateOut: Date; dateReturned: Date };
export type RentalType = {
  _id: string;
  customer: { _id: string; name: string; isGold: boolean; phone: string };
  instrument: { _id: string; maker: string; model: string; year: string };
  rentalFee: Number;
  dateOut: Date;
  dateReturned: Date;
};

export function saveRental(
  customerId: string,
  instrumentId: string,
  dateOut: Date,
  dateReturned: Date
) {
  return http.post(apiEndpoint, {
    customerId,
    instrumentId,
    dateOut,
    dateReturned,
  });
}

export function getRentedDates(
  instrumentId: string
): Promise<{ data: RentalDateType[] }> {
  return http.get(apiEndpoint + "/?instrumentId=" + instrumentId);
}
export function getRentals(): Promise<{ data: RentalType[] }> {
  return http.get(apiEndpoint);
}

export function deleteRental(id: string) {
  return http.delete(apiEndpoint + "/" + id);
}
