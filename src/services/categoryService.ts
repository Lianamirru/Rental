import http from "./httpService";
import apiUrl from "./config.json";

import { CategoryType, CategoryDataType } from "../types/categoryType";

const apiEndpoint = apiUrl.apiUrl + "/categories";

export function getCategories(): Promise<{ data: CategoryType[] }> {
  return http.get<CategoryType[]>(apiEndpoint);
}

export function deleteCategory(id: string) {
  return http.delete(apiEndpoint + "/" + id);
}

export function saveCategory(
  category: CategoryDataType
): Promise<{ data: CategoryType }> {
  return http.post(apiEndpoint, category);
}
