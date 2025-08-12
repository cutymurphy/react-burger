import toast from "react-hot-toast";
import { request } from "../../utils/request";
import { AppDispatch, AppThunk } from "../types";
import {
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from "../constants";
import { TGetAllOrdersData } from "../types/data";
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

export const getAllOrders = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(getAllOrdersRequest());
    request<TGetAllOrdersData>("/orders/all")
      .then((data) => {
        setTimeout(() => {
          dispatch(
            getAllOrdersSuccess(data.orders, data.total, data.totalToday)
          );
        }, 1000);
      })
      .catch(() => {
        dispatch(getAllOrdersError());
        toast.error("Произошла ошибка при получении заказов");
      });
  };
};
