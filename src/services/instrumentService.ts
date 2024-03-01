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

