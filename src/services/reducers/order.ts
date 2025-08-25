import { orderData, TOrderData } from "../../utils/order";
import { TOrderActions } from "../actions/order";
import {
  CLOSE_ORDER,
  POST_ORDER_ERROR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../constants";

type TOrderState = {
  order: TOrderData & { number: null | number };
  orderFailed: boolean;
  orderRequest: boolean;
};

export const initialOrder: TOrderState = {
  order: {
    ...orderData,
    number: null,
  },
  orderFailed: false,
  orderRequest: false,
};

export const orderReducer = (
  state = initialOrder,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: true,
      };
    }
    case POST_ORDER_ERROR: {
      return {
        ...state,
        order: { ...state.order, number: null },
        orderFailed: true,
        orderRequest: false,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        order: { ...state.order, number: action.orderNumber },
        orderFailed: false,
        orderRequest: false,
      };
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        order: { ...state.order, number: null },
        orderFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};
