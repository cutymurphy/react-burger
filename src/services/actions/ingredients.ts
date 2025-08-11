import toast from "react-hot-toast";
import { request } from "../../utils/request";
import {
  CLEAR_INGREDIENTS_COUNT,
  DECREASE_INGREDIENT_COUNT,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
} from "../constants";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../../utils/types";
import { TGetIngredientsData } from "../types/data";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIncreaseIngredientCountAction {
  readonly type: typeof INCREASE_INGREDIENT_COUNT;
  readonly ingredientId: string;
}

export interface IGetDecreaseIngredientCountAction {
  readonly type: typeof DECREASE_INGREDIENT_COUNT;
  readonly ingredientId: string;
}

export interface IGetClearIngredientsCountAction {
  readonly type: typeof CLEAR_INGREDIENTS_COUNT;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsErrorAction
  | IGetIngredientsSuccessAction
  | IGetIncreaseIngredientCountAction
  | IGetDecreaseIngredientCountAction
  | IGetClearIngredientsCountAction;

export const getIngredientsRequest = (): IGetIngredientsRequestAction => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientsError = (): IGetIngredientsErrorAction => {
  return {
    type: GET_INGREDIENTS_ERROR,
  };
};

export const getIngredientsSuccess = (
  ingredients: ReadonlyArray<TIngredient>
): IGetIngredientsSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
  };
};

export const increaseIngredientCount = (
  ingredientId: string
): IGetIncreaseIngredientCountAction => {
  return {
    type: INCREASE_INGREDIENT_COUNT,
    ingredientId,
  };
};

export const decreaseIngredientCount = (
  ingredientId: string
): IGetDecreaseIngredientCountAction => {
  return {
    type: DECREASE_INGREDIENT_COUNT,
    ingredientId,
  };
};

export const clearIngredientsCount = (): IGetClearIngredientsCountAction => {
  return {
    type: CLEAR_INGREDIENTS_COUNT,
  };
};

export const getIngredients = (): AppThunk => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    request<TGetIngredientsData>("/ingredients")
      .then((data) => {
        setTimeout(() => {
          dispatch(getIngredientsSuccess(data.data));
        }, 1000);
      })
      .catch(() => {
        dispatch(getIngredientsError());
        toast.error("Произошла ошибка при получении ингредиентов");
      });
  };
};
