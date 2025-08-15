import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../constants";

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly url: string;
}

export type TWSActions = IWSConnectionStart | IWSConnectionClosed;

export const handleWSConnectionStart = (url: string): IWSConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    url,
  };
};

export const handleWSConnectionClosed = (url: string): IWSConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
    url,
  };
};
