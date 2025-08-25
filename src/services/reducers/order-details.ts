import { TOrder } from "../../utils/types";
import { TOrderDetailsActions } from "../actions/order-details";
import { SELECT_ORDER, UNSELECT_ORDER } from "../constants";

type TOrderDetailsState = {
  selectedOrder: TOrder | null;
};

export const initialOrder: TOrderDetailsState = {
  selectedOrder: null,
};

export const orderDetailsReducer = (
  state = initialOrder,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case SELECT_ORDER: {
      return {
        ...state,
        selectedOrder: action.order,
      };
    }
    case UNSELECT_ORDER: {
      return {
        ...state,
        selectedOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};
