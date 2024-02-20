import http from "../services/httpService";
import apiUrl from "./config.json";

const apiEndpoint = apiUrl.apiUrl + "/likes";

export function likeInstrument(instrumentId: string) {
  return http.post(apiEndpoint + `/${instrumentId}`);
}
export function getLikedInstruments(): Promise<{ data: string[] }> {
  return http.get(apiEndpoint + "/");
}
