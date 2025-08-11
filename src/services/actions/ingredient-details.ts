import { SELECT_INGREDIENT, UNSELECT_INGREDIENT } from "../constants";
import { TIngredient } from "../../utils/types";

export interface IGetSelectIngredientAction {
  readonly type: typeof SELECT_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IGetUnselectIngredientAction {
  readonly type: typeof UNSELECT_INGREDIENT;
}

export type TIngredientDetailsActions =
  | IGetSelectIngredientAction
  | IGetUnselectIngredientAction;

export const selectIngredient = (
  ingredient: TIngredient
): IGetSelectIngredientAction => {
  return {
    type: SELECT_INGREDIENT,
    ingredient,
  };
};

export const unselectIngredient = (): IGetUnselectIngredientAction => {
  return {
    type: UNSELECT_INGREDIENT,
  };
};
