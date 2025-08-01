import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  CLEAR_INGREDIENTS_COUNT,
} from "../actions/ingredients";

const initialIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredients: [],
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case INCREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.ingredientId
            ? { ...item, __v: item.__v + 1 }
            : item
        ),
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.ingredientId
            ? { ...item, __v: item.__v - 1 }
            : item
        ),
      };
    }
    case CLEAR_INGREDIENTS_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) => ({
          ...item,
          __v: 0,
        })),
      };
    }
    default: {
      return state;
    }
  }
};
