import { EStatus, TOrder } from "../../utils/types";
import {
  GET_ORDERS_ERROR,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from "../constants";
import { initialOrders, ordersReducer } from "./orders";

describe("orders reducer", () => {
  const testOrders: TOrder[] = [
    {
      ingredients: [],
      _id: "1",
      status: EStatus.DONE,
      number: 1323,
      name: "Test_1",
      createdAt: "",
    },
    {
      ingredients: [],
      _id: "2",
      status: EStatus.CREATED,
      number: 1324,
      name: "Test_2",
      createdAt: "",
    },
  ];

  it("should return the initial state", () => {
    expect(ordersReducer(undefined, { type: "" } as any)).toEqual(
      initialOrders
    );
  });

  it("should handle GET_ORDERS_REQUEST", () => {
    expect(ordersReducer(initialOrders, { type: GET_ORDERS_REQUEST })).toEqual({
      ...initialOrders,
      ordersFailed: false,
      ordersRequest: true,
    });
  });

  it("should handle GET_ORDERS_ERROR", () => {
    expect(
      ordersReducer(
        {
          orders: testOrders,
          ordersRequest: true,
          ordersFailed: false,
        },
        { type: GET_ORDERS_ERROR }
      )
    ).toEqual({
      orders: [],
      ordersFailed: true,
      ordersRequest: false,
    });
  });

  it("should handle GET_ORDERS_SUCCESS", () => {
    expect(
      ordersReducer(initialOrders, {
        type: GET_ORDERS_SUCCESS,
        orders: testOrders,
      })
    ).toEqual({
      orders: testOrders,
      ordersFailed: false,
      ordersRequest: false,
    });
  });
});
