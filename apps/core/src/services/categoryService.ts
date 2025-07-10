import http from "./httpService";
import { API_URL } from "./consts";

import { CategoryType, CategoryDataType } from "../types/categoryType";

const apiEndpoint = API_URL + "/categories";

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
