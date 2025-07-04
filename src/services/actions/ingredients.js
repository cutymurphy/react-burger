import { request } from "../../utils/request";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export const INCREASE_INGREDIENT_COUNT = "INCREASE_INGREDIENT_COUNT";
export const DECREASE_INGREDIENT_COUNT = "DECREASE_INGREDIENT_COUNT";

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    request("/ingredients")
      .then((data) => {
        setTimeout(() => {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data.data,
          });
        }, 1000);
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_ERROR });
      });
  };
}
