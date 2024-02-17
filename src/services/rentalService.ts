import http from "../services/httpService";
import apiUrl from "./config.json";

const apiEndpoint = apiUrl.apiUrl + "/rentals";

type RentalDateType = { dateOut: Date; dateReturned: Date };
export type RentalType = {
  _id: string;
  customer: { _id: string; name: string; isGold: boolean; phone: string };
  movie: { title: string; _id: string };
  rentalFee: Number;
  dateOut: Date;
  dateReturned: Date;
};

export function saveRental(
  customerId: string,
  movieId: string,
  dateOut: Date,
  dateReturned: Date
) {
  return http.post(apiEndpoint, { customerId, movieId, dateOut, dateReturned });
}

export function getRentedDates(
  movieId: string
): Promise<{ data: RentalDateType[] | [] }> {
  return http.get(apiEndpoint + "/?movieId=" + movieId);
}
export function getRentals(): Promise<{ data: RentalType[] | [] }> {
  return http.get(apiEndpoint);
}

export function deleteRental(id: string) {
  return http.delete(apiEndpoint + "/" + id);
}
