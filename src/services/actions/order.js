import { request } from "../../utils/request";
import { CLEAR_CONSTRUCTOR } from "./builder";
import { CLEAR_INGREDIENTS_COUNT } from "./ingredients";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";

export const CLOSE_ORDER = "CLOSE_ORDER";

export function postOrder(ingredientIds) {
  return function (dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    })
      .then((data) => {
        setTimeout(() => {
          dispatch({
            type: POST_ORDER_SUCCESS,
            orderNumber: data.order.number,
          });
          dispatch({ type: CLEAR_INGREDIENTS_COUNT });
          dispatch({ type: CLEAR_CONSTRUCTOR });
        }, 500);
      })
      .catch(() => {
        alert("Произошла ошибка при создании заказа");
        dispatch({ type: POST_ORDER_ERROR });
      });
  };
}
