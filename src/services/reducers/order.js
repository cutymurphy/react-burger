import { orderData } from "../../utils/order"
import { CLOSE_ORDER, POST_ORDER_ERROR, POST_ORDER_SUCCESS } from "../actions/order"

const initialOrder = {
    order: {
        ...orderData,
        number: null,
    },
    orderFailed: false,

}

export const orderReducer = (state = initialOrder, action) => {
    switch (action.type) {
        case POST_ORDER_ERROR: {
            return {
                order: { ...state.order, number: null },
                orderFailed: true,
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                order: { ...state.order, number: action.orderNumber },
                orderFailed: false,
            }
        }
        case CLOSE_ORDER: {
            return {
                ...state,
                order: { ...state.order, number: null },
                orderFailed: false,
            }
        }
        default: {
            return state
        }
    }
}