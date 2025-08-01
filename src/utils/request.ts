import { BASE_URL } from "./api";
import { checkResponse } from "./checkResponse";

export function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return fetch(`${BASE_URL}${endpoint}`, options).then((res) =>
    checkResponse<T>(res)
  );
}
