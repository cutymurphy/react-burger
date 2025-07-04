import { orderData } from "../../utils/order";
import {
  CLOSE_ORDER,
  POST_ORDER_ERROR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../actions/order";

const initialOrder = {
  order: {
    ...orderData,
    number: null,
  },
  orderFailed: false,
  orderRequest: false,
};

export const orderReducer = (state = initialOrder, action) => {
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
