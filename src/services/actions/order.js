import toast from "react-hot-toast";
import { requestWithRefresh } from "../../utils/requestWithRefresh";
import { CLEAR_CONSTRUCTOR } from "./builder";
import { CLEAR_INGREDIENTS_COUNT } from "./ingredients";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";

export const CLOSE_ORDER = "CLOSE_ORDER";

export function postOrder(ingredientIds, accessToken) {
  return function (dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    requestWithRefresh("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
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
          toast.success("Заказ успешно создан");
        }, 500);
      })
      .catch(() => {
        toast.error("Произошла ошибка при создании заказа");
        dispatch({ type: POST_ORDER_ERROR });
      });
  };
}
