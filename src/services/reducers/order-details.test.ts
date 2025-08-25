import { orderDetailsReducer } from "./order-details";
import { SELECT_ORDER, UNSELECT_ORDER } from "../constants";
import { EStatus, TOrder } from "../../utils/types";

describe("orderDetails reducer", () => {
  const order: TOrder = {
    ingredients: [],
    _id: "123",
    status: EStatus.DONE,
    number: 0,
    name: "Test order",
    createdAt: "",
  };

  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, { type: "" } as any)).toEqual({
      selectedOrder: null,
    });
  });

  it("should handle SELECT_ORDER", () => {
    expect(
      orderDetailsReducer(undefined, {
        type: SELECT_ORDER,
        order,
      })
    ).toEqual({
      selectedOrder: order,
    });
  });

  it("should handle UNSELECT_ORDER", () => {
    expect(
      orderDetailsReducer(
        {
          selectedOrder: order,
        },
        {
          type: UNSELECT_ORDER,
        }
      )
    ).toEqual({
      selectedOrder: null,
    });
  });
});
