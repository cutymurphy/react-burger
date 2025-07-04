import { BASE_URL } from "./api";
import { checkResponse } from "./checkResponse";

export function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}
