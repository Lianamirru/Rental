import http from "../services/httpService";
import apiUrl from "./config.json";

import { MovieDataType, MovieType } from "../types/movieType";

const apiEndpoint = apiUrl.apiUrl + "/movies";

function movieUrl(id: string) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies(): Promise<{ data: MovieType[] }> {
  return http.get(apiEndpoint);
}

export function getMovie(id: string): Promise<{ data: MovieType }> {
  return http.get(movieUrl(id));
}

export function saveMovie(movie: MovieDataType) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(id: string) {
  return http.delete(movieUrl(id));
}
