import { v4 as uuidv4 } from "uuid";
import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../constants";
import { TIngredient } from "../../utils/types";

export interface IGetAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient & { uniqueId: string };
}

export interface IGetDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredientUniqueId: string;
}

export interface IGetChangeBunAction {
  readonly type: typeof CHANGE_BUN;
  readonly bun: TIngredient;
}

export interface IGetMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly fromIndex: number;
  readonly toIndex: number;
}

export interface IGetClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBuilderActions =
  | IGetAddIngredientAction
  | IGetDeleteIngredientAction
  | IGetChangeBunAction
  | IGetMoveIngredientAction
  | IGetClearConstructorAction;

export const addIngredient = (
  ingredient: TIngredient
): IGetAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      uniqueId: uuidv4(),
    },
  };
};

export const deleteIngredient = (
  ingredientUniqueId: string
): IGetDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    ingredientUniqueId,
  };
};

export const changeBun = (bun: TIngredient): IGetChangeBunAction => {
  return {
    type: CHANGE_BUN,
    bun,
  };
};

export const moveIngredient = (
  fromIndex: number,
  toIndex: number
): IGetMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    fromIndex,
    toIndex,
  };
};

export const clearConstructor = (): IGetClearConstructorAction => {
  return {
    type: CLEAR_CONSTRUCTOR,
  };
};
