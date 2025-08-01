import { EErrors } from "./errors";
import { emailPattern } from "./patterns";

export const validateField = (field: string, value: string): string => {
  switch (field) {
    case "name":
    case "code":
      return !value.trim() ? EErrors.ERROR_EMPTY : "";
    case "email":
      return !value.trim()
        ? EErrors.ERROR_EMPTY
        : !emailPattern.test(value.trim())
        ? EErrors.ERROR_EMAIL
        : "";
    case "password":
      return !value.trim()
        ? EErrors.ERROR_EMPTY
        : value.length < 6
        ? EErrors.ERROR_PASSWORD
        : "";
    default:
      return "";
  }
};
