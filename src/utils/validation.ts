import { ERROR_EMAIL, ERROR_EMPTY, ERROR_PASSWORD } from "./errors";
import { emailPattern } from "./patterns";

export const validateField = (field: string, value: string): string => {
  switch (field) {
    case "name":
    case "code":
      return !value.trim() ? ERROR_EMPTY : "";
    case "email":
      return !value.trim()
        ? ERROR_EMPTY
        : !emailPattern.test(value.trim())
        ? ERROR_EMAIL
        : "";
    case "password":
      return !value.trim()
        ? ERROR_EMPTY
        : value.length < 6
        ? ERROR_PASSWORD
        : "";
    default:
      return "";
  }
};
