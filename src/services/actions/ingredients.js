import { apiIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export function getIngredients() {
    return function (dispatch) {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        fetch(apiIngredients)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data => {
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

    }
}