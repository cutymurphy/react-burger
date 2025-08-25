import { TIngredient } from "../../utils/types";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { SELECT_INGREDIENT, UNSELECT_INGREDIENT } from "../constants";

type TIngredientDetailsState = {
  selectedIngredient: TIngredient | null;
};

export const initialIngredient: TIngredientDetailsState = {
  selectedIngredient: null,
};

export const ingredientReducer = (
  state = initialIngredient,
  action: TIngredientDetailsActions
): TIngredientDetailsState => {
  switch (action.type) {
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
      };
    }
    case UNSELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
