import { ingredientsReducer } from "./ingredients";
import {
  CLEAR_INGREDIENTS_COUNT,
  DECREASE_INGREDIENT_COUNT,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
} from "../constants";
import { TIngredient } from "../../utils/types";

describe("ingredients reducer", () => {
  const ingredient1: TIngredient = {
    _id: "1",
    name: "Ingredient 1",
    type: "main",
    proteins: 10,
    fat: 5,
    carbohydrates: 3,
    calories: 50,
    price: 100,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  };

  const ingredient2: TIngredient = {
    _id: "2",
    name: "Ingredient 2",
    type: "sauce",
    proteins: 5,
    fat: 2,
    carbohydrates: 1,
    calories: 20,
    price: 50,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 2,
  };

  const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  };

  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, { type: "" } as any)).toEqual(
      initialState
    );
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_ERROR", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [ingredient1],
          ingredientsRequest: true,
          ingredientsFailed: false,
        },
        { type: GET_INGREDIENTS_ERROR }
      )
    ).toEqual({
      ingredients: [],
      ingredientsFailed: true,
      ingredientsRequest: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const newIngredients = [ingredient1, ingredient2];

    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: newIngredients,
      })
    ).toEqual({
      ingredients: newIngredients,
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it("should handle INCREASE_INGREDIENT_COUNT", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [ingredient1, ingredient2],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: INCREASE_INGREDIENT_COUNT,
          ingredientId: "1",
        }
      )
    ).toEqual({
      ingredients: [{ ...ingredient1, __v: 1 }, ingredient2],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it("should handle DECREASE_INGREDIENT_COUNT", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [ingredient1, ingredient2],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        {
          type: DECREASE_INGREDIENT_COUNT,
          ingredientId: "2",
        }
      )
    ).toEqual({
      ingredients: [ingredient1, { ...ingredient2, __v: 1 }],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it("should handle CLEAR_INGREDIENTS_COUNT", () => {
    expect(
      ingredientsReducer(
        {
          ingredients: [ingredient1, ingredient2],
          ingredientsRequest: false,
          ingredientsFailed: false,
        },
        { type: CLEAR_INGREDIENTS_COUNT }
      )
    ).toEqual({
      ingredients: [
        { ...ingredient1, __v: 0 },
        { ...ingredient2, __v: 0 },
      ],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });
});
