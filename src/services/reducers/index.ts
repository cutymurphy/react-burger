import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { builderReducer } from "./builder";
import { ingredientReducer } from "./ingredient-details";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { allOrdersReducer } from "./allOrders";
import { orderDetailsReducer } from "./order-details";
import { ordersReducer } from "./orders";

export const rootReducer = combineReducers({
  builder: builderReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  orders: ordersReducer,
});
