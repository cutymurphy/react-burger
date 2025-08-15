import { TGetOrderData } from "../services/types/data";
import { request } from "./request";

export type TOrderData = {
  message: string;
  subMessage: string;
};

export const orderData: TOrderData = {
  message: "Ваш заказ начали готовить",
  subMessage: "Дождитесь готовности на орбитальной станции",
};

export const getOrderById = (id: string): Promise<TGetOrderData> =>
  request<TGetOrderData>(`/orders/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
