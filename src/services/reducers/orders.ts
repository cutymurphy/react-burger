import { TOrder } from "../../utils/types";
import { TOrdersActions } from "../actions/orders";
import {
  GET_ORDERS_ERROR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from "../constants";

type TOrdersState = {
  orders: ReadonlyArray<TOrder>;
  ordersRequest: boolean;
  ordersFailed: boolean;
};

const initialOrders: TOrdersState = {
  orders: [],
  ordersRequest: false,
  ordersFailed: false,
};

export const ordersReducer = (
  state = initialOrders,
  action: TOrdersActions
): TOrdersState => {
  switch (action.type) {
    case GET_ORDERS_REQUEST: {
      return {
        ...state,
        ordersFailed: false,
        ordersRequest: true,
      };
    }
    case GET_ORDERS_ERROR: {
      return {
        ...state,
        orders: [],
        ordersFailed: true,
        ordersRequest: false,
      };
    }
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.orders,
        ordersFailed: false,
        ordersRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
