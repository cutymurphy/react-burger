import { ReactElement } from "react";

export interface IProtectedRouteElement {
  element: ReactElement;
  isProtectedFromUnAuthUser?: boolean;
}
