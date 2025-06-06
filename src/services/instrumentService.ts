import http from "./httpService";
import { API_URL } from "./consts";
import { InstrumentType } from "../types/instrumentType";

const apiEndpoint = API_URL + "/instruments";

function movieUrl(id: string) {
  return `${apiEndpoint}/${id}`;
}

export function getInstruments(): Promise<{ data: InstrumentType[] }> {
  return http.get(apiEndpoint);
}

export function getInstrument(id: string): Promise<{ data: InstrumentType }> {
  return http.get(movieUrl(id));
}
