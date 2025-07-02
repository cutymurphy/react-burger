import { apiOrders } from "../../utils/api";

export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const CLOSE_ORDER = "CLOSE_ORDER";

export function postOrder(ingredientIds) {
    return function (dispatch) {
        fetch(apiOrders, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: ingredientIds }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
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
