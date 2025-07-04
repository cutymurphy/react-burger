import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { builderReducer } from "./builder";
import { ingredientReducer } from "./ingredient-details";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
    builder: builderReducer,
    ingredient: ingredientReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
});