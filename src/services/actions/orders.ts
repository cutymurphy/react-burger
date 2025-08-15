import { TOrder } from "../../utils/types";
import {
  GET_ORDERS_ERROR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from "../constants";

export interface IGetOrdersRequestAction {
  readonly type: typeof GET_ORDERS_REQUEST;
}

export interface IGetOrdersErrorAction {
  readonly type: typeof GET_ORDERS_ERROR;
}

export interface IGetOrdersSuccessAction {
  readonly type: typeof GET_ORDERS_SUCCESS;
  readonly orders: ReadonlyArray<TOrder>;
}

export type TOrdersActions =
  | IGetOrdersRequestAction
  | IGetOrdersErrorAction
  | IGetOrdersSuccessAction;

export const getOrdersRequest = (): IGetOrdersRequestAction => {
  return {
    type: GET_ORDERS_REQUEST,
  };
};

export const getOrdersError = (): IGetOrdersErrorAction => {
  return {
    type: GET_ORDERS_ERROR,
  };
};

export const getOrdersSuccess = (
  orders: ReadonlyArray<TOrder>
): IGetOrdersSuccessAction => {
  return {
    type: GET_ORDERS_SUCCESS,
    orders,
  };
};
