import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const CHANGE_BUN = "CHANGE_BUN";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      uniqueId: uuidv4(),
    },
  };
};
