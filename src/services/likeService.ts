import http from "../services/httpService";
import apiUrl from "./config.json";

const apiEndpoint = apiUrl.apiUrl + "/likes";

export function likeMovie(movieId: string) {
  return http.post(apiEndpoint + `/${movieId}`);
}
export function getLikedMovies(): Promise<{ data: string[] }> {
  return http.get(apiEndpoint + "/");
}
