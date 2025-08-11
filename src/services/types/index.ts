import { store } from "../../store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TBuilderActions } from "../actions/builder";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TBuilderActions
  | TIngredientDetailsActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
