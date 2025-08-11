import toast from "react-hot-toast";
import { requestWithRefresh } from "../../utils/requestWithRefresh";
import { clearIngredientsCount } from "./ingredients";
import { clearConstructor } from "./builder";
import {
  CLOSE_ORDER,
  POST_ORDER_ERROR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../constants";
import { AppDispatch, AppThunk } from "../types";
import { TPostOrderData } from "../types/data";

export interface IGetPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IGetPostOrderErrorAction {
  readonly type: typeof POST_ORDER_ERROR;
}

export interface IGetPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IGetCloseOrderAction {
  readonly type: typeof CLOSE_ORDER;
}

export type TOrderActions =
  | IGetPostOrderRequestAction
  | IGetPostOrderErrorAction
  | IGetPostOrderSuccessAction
  | IGetCloseOrderAction;

export const postOrderRequest = (): IGetPostOrderRequestAction => {
  return {
    type: POST_ORDER_REQUEST,
  };
};

export const postOrderError = (): IGetPostOrderErrorAction => {
  return {
    type: POST_ORDER_ERROR,
  };
};

export const postOrderSuccess = (
  orderNumber: number
): IGetPostOrderSuccessAction => {
  return {
    type: POST_ORDER_SUCCESS,
    orderNumber,
  };
};

export const closeOrder = (): IGetCloseOrderAction => {
  return {
    type: CLOSE_ORDER,
  };
};

export const postOrder = (
  ingredientIds: string[],
  accessToken: string
): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(postOrderRequest());
    requestWithRefresh<TPostOrderData>(
      "/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      },
      dispatch
    )
      .then((data) => {
        setTimeout(() => {
          dispatch(postOrderSuccess(data.order.number));
          dispatch(clearIngredientsCount());
          dispatch(clearConstructor());
          toast.success("Заказ успешно создан");
        }, 500);
      })
      .catch(() => {
        toast.error("Произошла ошибка при создании заказа");
        dispatch(postOrderError());
      });
  };
};
