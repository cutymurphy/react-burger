import { store } from "../../store";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TBuilderActions } from "../actions/builder";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TAllOrdersActions } from "../actions/allOrders";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TBuilderActions
  | TIngredientDetailsActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TAllOrdersActions;

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
