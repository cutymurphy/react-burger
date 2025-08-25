import { builderReducer } from "./builder";
import {
  ADD_INGREDIENT,
  CHANGE_BUN,
  CLEAR_CONSTRUCTOR,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../constants";
import { TIngredient } from "../../utils/types";

describe("builder reducer", () => {
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
    uniqueId: "u1",
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
    __v: 0,
    uniqueId: "u2",
  };

  const bun: TIngredient = {
    _id: "3",
    name: "Bun",
    type: "bun",
    proteins: 8,
    fat: 4,
    carbohydrates: 2,
    calories: 40,
    price: 30,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
    uniqueId: "b1",
  };

  it("should return the initial state", () => {
    expect(builderReducer(undefined, { type: "" } as any)).toEqual({
      selectedIngredients: [],
      mainBun: null,
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      builderReducer(undefined, {
        type: ADD_INGREDIENT,
        payload: { ...ingredient1, uniqueId: "u1" },
      })
    ).toEqual({
      selectedIngredients: [ingredient1],
      mainBun: null,
    });
  });

  it("should handle DELETE_INGREDIENT", () => {
    expect(
      builderReducer(
        { selectedIngredients: [ingredient1, ingredient2], mainBun: null },
        { type: DELETE_INGREDIENT, ingredientUniqueId: "u1" }
      )
    ).toEqual({
      selectedIngredients: [ingredient2],
      mainBun: null,
    });
  });

  it("should handle CHANGE_BUN", () => {
    expect(
      builderReducer(undefined, {
        type: CHANGE_BUN,
        bun,
      })
    ).toEqual({
      selectedIngredients: [],
      mainBun: bun,
    });
  });

  it("should handle MOVE_INGREDIENT", () => {
    expect(
      builderReducer(
        {
          selectedIngredients: [ingredient1, ingredient2],
          mainBun: null,
        },
        {
          type: MOVE_INGREDIENT,
          fromIndex: 0,
          toIndex: 1,
        }
      )
    ).toEqual({
      selectedIngredients: [ingredient2, ingredient1],
      mainBun: null,
    });
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    expect(
      builderReducer(
        {
          selectedIngredients: [ingredient1, ingredient2],
          mainBun: bun,
        },
        { type: CLEAR_CONSTRUCTOR }
      )
    ).toEqual({
      selectedIngredients: [],
      mainBun: null,
    });
  });
});
