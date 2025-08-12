import { TOrder } from "../../utils/types";
import { TAllOrdersActions } from "../actions/allOrders";
import {
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from "../constants";

type TAllOrdersState = {
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
  ordersRequest: boolean;
  ordersFailed: boolean;
};

const initialOrders: TAllOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  ordersRequest: false,
  ordersFailed: false,
};

export const allOrdersReducer = (
  state = initialOrders,
  action: TAllOrdersActions
): TAllOrdersState => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST: {
      return {
        ...state,
        ordersFailed: false,
        ordersRequest: true,
      };
    }
    case GET_ALL_ORDERS_ERROR: {
      return {
        ...state,
        orders: [],
        total: 0,
        totalToday: 0,
        ordersFailed: true,
        ordersRequest: false,
      };
    }
    case GET_ALL_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.allOrders,
        total: action.total,
        totalToday: action.totalToday,
        ordersFailed: false,
        ordersRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
