import { TIngredient } from "../../utils/types";

export interface IBurgerIngredient {
  ingredient: TIngredient;
  onClick: () => void;
  "data-testid"?: string;
}
