import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS } from "../actions/ingredients"

const initialIngredients = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (state = initialIngredients, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ingredients: [],
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsFailed: false,
                ingredientsRequest: false
            }
        }
        default: {
            return state;
        }
    }
}