import { TIngredient } from "../../utils/types";

export interface IIngredientDraggable {
  ingredient: TIngredient;
  index: number;
  "data-testid"?: string;
}

export type TDragItem = {
  id: string;
  index: number;
};
