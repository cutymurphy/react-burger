import { TIngredient } from "../../utils/types";

export interface IIngredientDraggable {
  ingredient: TIngredient;
  index: number;
}

export type TDragItem = {
  id: string;
  index: number;
};
