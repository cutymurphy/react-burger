import { TIngredient } from "../../utils/types";
import { TBuilderActions } from "../actions/builder";
import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../constants";

type TBuilderState = {
  selectedIngredients: ReadonlyArray<TIngredient>;
  mainBun: null | TIngredient;
};

const initialBuilder: TBuilderState = {
  selectedIngredients: [],
  mainBun: null,
};

export const builderReducer = (
  state = initialBuilder,
  action: TBuilderActions
): TBuilderState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (item) => item.uniqueId !== action.ingredientUniqueId
        ),
      };
    }
    case CHANGE_BUN: {
      return {
        ...state,
        mainBun: action.bun,
      };
    }
    case MOVE_INGREDIENT: {
      const { fromIndex, toIndex } = action;
      const selected = [...state.selectedIngredients];

      const removedItems = selected.splice(fromIndex, 1);
      const movedItem = removedItems[0];

      selected.splice(toIndex, 0, movedItem);

      return {
        ...state,
        selectedIngredients: selected,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        selectedIngredients: [],
        mainBun: null,
      };
    }
    default: {
      return state;
    }
  }
};
