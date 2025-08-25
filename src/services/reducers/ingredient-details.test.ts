import { TIngredient } from "../../utils/types";
import { ingredientReducer } from "./ingredient-details";
import { SELECT_INGREDIENT, UNSELECT_INGREDIENT } from "../constants";

describe("ingredient details reducer", () => {
  const ingredient: TIngredient = {
    _id: "123",
    name: "Test_ing",
    type: "bun",
    proteins: 10,
    fat: 12,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  };

  it("should return the initial state", () => {
    expect(ingredientReducer(undefined, { type: "" } as any)).toEqual({
      selectedIngredient: null,
    });
  });

  it("should handle SELECT_INGREDIENT", () => {
    expect(
      ingredientReducer(undefined, {
        type: SELECT_INGREDIENT,
        ingredient,
      })
    ).toEqual({
      selectedIngredient: ingredient,
    });
  });

  it("should handle UNSELECT_INGREDIENT", () => {
    expect(
      ingredientReducer(
        {
          selectedIngredient: ingredient,
        },
        {
          type: UNSELECT_INGREDIENT,
        }
      )
    ).toEqual({
      selectedIngredient: null,
    });
  });
});
