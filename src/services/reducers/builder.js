import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  DELETE_INGREDIENT,
} from "../actions/builder";

const initialBuilder = {
  selectedIngredientsIds: [],
  mainBunId: "643d69a5c3f7b9001cfa093c",
};

export const builderReducer = (state = initialBuilder, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        selectedIngredientsIds: [
          ...state.selectedIngredientsIds,
          action.ingredientId,
        ],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        selectedIngredientsIds: state.selectedIngredientsIds.filter(
          (_, index) => index !== action.ingredientIndex
        ),
      };
    }
    case CHANGE_BUN: {
      return {
        ...state,
        mainBunId: action.bunId,
      };
    }
    default: {
      return state;
    }
  }
};
