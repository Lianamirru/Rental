import http from "../services/httpService";
import apiUrl from "./config.json";

import { GenreType, GenreDataType } from "../types/genreType";

const apiEndpoint = apiUrl.apiUrl + "/genres";

export function getGenres(): Promise<{ data: GenreType[] }> {
  return http.get<GenreType[]>(apiEndpoint);
}

export function deleteGenre(id: string) {
  return http.delete(apiEndpoint + "/" + id);
}

export function saveGenre(genre: GenreDataType): Promise<{ data: GenreType }> {
  return http.post(apiEndpoint, genre);
}
