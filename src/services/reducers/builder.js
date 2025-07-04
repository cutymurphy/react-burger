import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../actions/builder";

const initialBuilder = {
  selectedIngredientsIds: [],
  mainBunId: null,
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
    case MOVE_INGREDIENT: {
      const { fromIndex, toIndex } = action;
      const selected = [...state.selectedIngredientsIds];

      const removedItems = selected.splice(fromIndex, 1);
      const movedItem = removedItems[0];

      selected.splice(toIndex, 0, movedItem);

      return {
        ...state,
        selectedIngredientsIds: selected,
      };
    }

    default: {
      return state;
    }
  }
};
