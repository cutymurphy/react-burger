import toast from "react-hot-toast";
import { AppDispatch, AppThunk } from "../types";
import { TOrder } from "../../utils/types";
import {
  GET_ORDERS_ERROR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from "../constants";
import { TGetOrdersData } from "../types/data";
import { requestWithRefresh } from "../../utils/requestWithRefresh";

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

export const getOrders = (accessToken: string): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrdersRequest());
    requestWithRefresh<TGetOrdersData>(
      "/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      },
      dispatch
    )
      .then((data) => {
        setTimeout(() => {
          dispatch(getOrdersSuccess(data.orders.reverse()));
        }, 1000);
      })
      .catch(() => {
        dispatch(getOrdersError());
        toast.error("Произошла ошибка при получении заказов");
      });
  };
};
