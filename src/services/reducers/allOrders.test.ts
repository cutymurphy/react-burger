import { allOrdersReducer, initialOrders } from "../reducers/allOrders";
import {
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_SUCCESS,
} from "../constants";
import { EStatus, TOrder } from "../../utils/types";

describe("allOrders reducer", () => {
  const orders: TOrder[] = [
    {
      ingredients: [],
      _id: "123",
      status: EStatus.DONE,
      number: 0,
      name: "Test order_0",
      createdAt: "",
    },
    {
      ingredients: [],
      _id: "1234",
      status: EStatus.DONE,
      number: 1,
      name: "Test order_1",
      createdAt: "",
    },
  ];

  it("should return the initial state", () => {
    expect(allOrdersReducer(undefined, { type: "" } as any)).toEqual(
      initialOrders
    );
  });

  it("should handle GET_ALL_ORDERS_REQUEST", () => {
    expect(
      allOrdersReducer(initialOrders, {
        type: GET_ALL_ORDERS_REQUEST,
      })
    ).toEqual({
      ...initialOrders,
      ordersRequest: true,
      ordersFailed: false,
    });
  });

  it("should handle GET_ALL_ORDERS_ERROR", () => {
    expect(
      allOrdersReducer(
        {
          ...initialOrders,
          orders,
          total: 1000,
          totalToday: 50,
        },
        {
          type: GET_ALL_ORDERS_ERROR,
        }
      )
    ).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      ordersFailed: true,
      ordersRequest: false,
    });
  });

  it("should handle GET_ALL_ORDERS_SUCCESS", () => {
    expect(
      allOrdersReducer(initialOrders, {
        type: GET_ALL_ORDERS_SUCCESS,
        allOrders: orders,
        total: 100,
        totalToday: 10,
      })
    ).toEqual({
      orders,
      total: 100,
      totalToday: 10,
      ordersRequest: false,
      ordersFailed: false,
    });
  });
});
