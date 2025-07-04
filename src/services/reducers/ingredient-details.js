import { SELECT_INGREDIENT, UNSELECT_INGREDIENT } from "../actions/ingredient-details"

const initialIngredient = {
    selectedIngredient: null
}

export const ingredientReducer = (state = initialIngredient, action) => {
    switch (action.type) {
        case SELECT_INGREDIENT: {
            return {
                ...state,
                selectedIngredient: action.ingredient
            }
        }
        case UNSELECT_INGREDIENT: {
            return {
                ...state,
                selectedIngredient: null
            }
        }
        default: {
            return state
        }
    }
}