import {
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from "../constants";
import { TOrder } from "../../utils/types";

export interface IGetAllOrdersRequestAction {
  readonly type: typeof GET_ALL_ORDERS_REQUEST;
}

export interface IGetAllOrdersErrorAction {
  readonly type: typeof GET_ALL_ORDERS_ERROR;
}

export interface IGetAllOrdersSuccessAction {
  readonly type: typeof GET_ALL_ORDERS_SUCCESS;
  readonly allOrders: ReadonlyArray<TOrder>;
  readonly total: number;
  readonly totalToday: number;
}

export type TAllOrdersActions =
  | IGetAllOrdersRequestAction
  | IGetAllOrdersErrorAction
  | IGetAllOrdersSuccessAction;

export const getAllOrdersRequest = (): IGetAllOrdersRequestAction => {
  return {
    type: GET_ALL_ORDERS_REQUEST,
  };
};

export const getAllOrdersError = (): IGetAllOrdersErrorAction => {
  return {
    type: GET_ALL_ORDERS_ERROR,
  };
};

export const getAllOrdersSuccess = (
  allOrders: ReadonlyArray<TOrder>,
  total: number,
  totalToday: number
): IGetAllOrdersSuccessAction => {
  return {
    type: GET_ALL_ORDERS_SUCCESS,
    allOrders,
    total,
    totalToday,
  };
};
