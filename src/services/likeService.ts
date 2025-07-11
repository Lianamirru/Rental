import http from "./httpService";
import { API_URL } from "./consts";

const apiEndpoint = API_URL + "/likes";

export function likeInstrument(instrumentId: string) {
  return http.post(apiEndpoint + `/${instrumentId}`);
}
export function getLikedInstruments(): Promise<{ data: string[] }> {
  return http.get(apiEndpoint + "/");
}
