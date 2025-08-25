import { orderData } from "../../utils/order";
import {
  CLOSE_ORDER,
  POST_ORDER_ERROR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../constants";
import { orderReducer } from "./order";

describe("order reducer", () => {
  const initialState = {
    order: {
      ...orderData,
      number: null,
    },
    orderFailed: false,
    orderRequest: false,
  };

  const testOrder = {
    ...orderData,
    number: 14343,
  };

  it("should return the initial state", () => {
    expect(orderReducer(undefined, { type: "" } as any)).toEqual(initialState);
  });

  it("should handle POST_ORDER_REQUEST", () => {
    expect(orderReducer(initialState, { type: POST_ORDER_REQUEST })).toEqual({
      ...initialState,
      orderFailed: false,
      orderRequest: true,
    });
  });

  it("should handle POST_ORDER_ERROR", () => {
    expect(
      orderReducer(
        {
          order: testOrder,
          orderRequest: true,
          orderFailed: false,
        },
        { type: POST_ORDER_ERROR }
      )
    ).toEqual({
      order: { ...orderData, number: null },
      orderFailed: true,
      orderRequest: false,
    });
  });

  it("should handle POST_ORDER_SUCCESS", () => {
    expect(
      orderReducer(initialState, {
        type: POST_ORDER_SUCCESS,
        orderNumber: 1000,
      })
    ).toEqual({
      order: { ...orderData, number: 1000 },
      orderFailed: false,
      orderRequest: false,
    });
  });

  it("should handle CLOSE_ORDER", () => {
    expect(
      orderReducer(
        {
          order: { ...orderData, number: 1000 },
          orderRequest: false,
          orderFailed: false,
        },
        { type: CLOSE_ORDER }
      )
    ).toEqual({
      order: { ...orderData, number: null },
      orderRequest: false,
      orderFailed: false,
    });
  });
});
