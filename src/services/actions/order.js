import { request } from "../../utils/request";

export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const CLOSE_ORDER = "CLOSE_ORDER";

export function postOrder(ingredientIds) {
  return function (dispatch) {
    request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    })
      .then((data) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNumber: data.order.number,
        });
      })
      .catch(() => {
        alert("Произошла ошибка при создании заказа");
        dispatch({ type: POST_ORDER_ERROR });
      });
  };
}
