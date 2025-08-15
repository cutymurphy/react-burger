import { TOrder } from "../../utils/types";
import { SELECT_ORDER, UNSELECT_ORDER } from "../constants";

export interface IGetSelectOrderAction {
  readonly type: typeof SELECT_ORDER;
  readonly order: TOrder;
}

export interface IGetUnselectOrderAction {
  readonly type: typeof UNSELECT_ORDER;
}

export type TOrderDetailsActions =
  | IGetSelectOrderAction
  | IGetUnselectOrderAction;

export const selectOrder = (order: TOrder): IGetSelectOrderAction => {
  return {
    type: SELECT_ORDER,
    order,
  };
};

export const unselectOrder = (): IGetUnselectOrderAction => {
  return {
    type: UNSELECT_ORDER,
  };
};
