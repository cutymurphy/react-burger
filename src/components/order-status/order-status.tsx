import { FC } from "react";
import { IOrderStatus } from "./types";
import { EStatus } from "../../utils/types";

const OrderStatus: FC<IOrderStatus> = ({ status }) =>
  status === EStatus.DONE ? (
    <p className="text text_type_main-default text_color_success">Выполнен</p>
  ) : status === EStatus.CANCELLED ? (
    <p className="text text_type_main-default text_color_error">Отменен</p>
  ) : status === EStatus.PENDING ? (
    <p className="text text_type_main-default text_color_accent">Готовится</p>
  ) : (
    <p className="text text_type_main-default">Создан</p>
  );

export default OrderStatus;
