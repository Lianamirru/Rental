import http from "./httpService";
import apiUrl from "./config.json";
import { InstrumentType } from "../types/instrumentType";

const apiEndpoint = apiUrl.apiUrl + "/instruments";

function movieUrl(id: string) {
  return `${apiEndpoint}/${id}`;
}

export function getInstruments(): Promise<{ data: InstrumentType[] }> {
  return http.get(apiEndpoint);
}

export function getInstrument(id: string): Promise<{ data: InstrumentType }> {
  return http.get(movieUrl(id));
}

// export function saveMovie(movie: InstrumentType) {
//   if (movie._id) {
//     const body = { ...movie };
//     delete body._id;
//     return http.put(movieUrl(movie._id), body);
//   }
//   return http.post(apiEndpoint, movie);
// }

// export function deleteMovie(id: string) {
//   return http.delete(movieUrl(id));
// }
